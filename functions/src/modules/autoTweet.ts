import { firestore, functions } from '../lib/firebase';
import { twitter } from '../lib/twitter';
import { Tweet } from '../model';

export const autoTweet = async (_: functions.EventContext) => {
  try {
    // get reserve
    const tweetSnapshot = await firestore.collection('twitter/v1/tweet').get();
    if (tweetSnapshot.empty) throw new Error('reserve is empty.');

    // create tweet list
    let tweetList: Tweet[] = [];
    for (let doc of tweetSnapshot.docs) {
      // check reserve time
      const tweet = { ...doc.data(), tweetId: doc.id } as Tweet;
      const now = new Date();
      const tweetAt = (tweet.tweetAt as FirebaseFirestore.Timestamp).toMillis();
      const isTweetable = now.getTime() - tweetAt > 0;

      // check post exist
      const postDoc = await firestore.doc(`posts/${tweet.postId}`).get();
      const existsPost = postDoc.exists;
      if (!existsPost)
        throw new Error(`postId: ${tweet.postId} is not exists.`);

      if (isTweetable && existsPost) {
        tweetList = [...tweetList, tweet];
      }
    }

    console.log(tweetList);

    await Promise.all(
      tweetList.map(async (tweet) => {
        // tweet
        await twitter.v1.tweet(tweet.text);
        // delete reserve
        await firestore.doc(`twitter/v1/tweet/${tweet.tweetId}`).delete();
      })
    );

    console.log('auto tweet success!');
  } catch (err) {
    if (err instanceof Error) {
      console.log('auto tweet failed!', err.message);
    } else {
      console.log('auto tweet failed!', err);
    }
  }
};
