import { Request, Response } from 'firebase-functions/v1';
import { FildValue, firestore } from '../lib/firebase';
import { Post, SystemTweetReserve, User } from '../model';
import { TweetDocument } from '../model/Tweet';
import { generateRandomNumber } from '../utils/generateRandomNumber';

// todo
// interval
// operating time
// black date
// black list

export const autoReserve = async (_: Request, res: Response) => {
  try {
    // get random post id
    const indexDoc = await firestore.doc('index/v2').get();
    if (!indexDoc.exists) throw new Error("doc('index/v2') not found");

    const index = indexDoc.data() as { allPosts: string[] };
    if (!index) throw new Error("doc('index/v2') data is empty");

    // get reserve length
    const systemTweetReserveSnapshot = await firestore
      .collection('twitter/v1/system/tweet/reserve')
      .get();
    if (systemTweetReserveSnapshot.empty)
      throw new Error("doc('twitter/v1/system/tweet/reserve') not found");

    const systemTweetReserve =
      systemTweetReserveSnapshot.docs[0].data() as SystemTweetReserve;
    if (!systemTweetReserve)
      throw new Error("doc('twitter/v1/system/tweet/reserve') data is empty");
    const reserveLength = systemTweetReserve.length;

    // create random post id array
    let randomPostIds: string[] = [];
    for (let i = 0; i < reserveLength; ) {
      const randomIndex = generateRandomNumber(0, index.allPosts.length - 1);

      if (!randomPostIds.includes(index.allPosts[randomIndex])) {
        randomPostIds = [...randomPostIds, index.allPosts[randomIndex]];
        i++;
      }
    }

    // get random posts
    await Promise.all(
      randomPostIds.map(async (postId) => {
        // get post
        const postDoc = await firestore.doc(`posts/${postId}`).get();
        if (!postDoc.exists) return;

        const post = postDoc.data() as Post;
        if (!post) return;

        // get user
        const userDoc = await firestore.doc(`users/${post.uid}`).get();
        if (!userDoc.exists) return;

        const user = userDoc.data() as User;
        if (!user) return;

        // create tweet
        const shareLink = `https://pigu-ryu.web.app/${user.uid}/${postId}/share`;
        const tweetText = `${post.title}｜${user.displayName}\n\n#pigu #琉大\n${shareLink}`;

        const tweet: TweetDocument = {
          postId: post.id,
          text: tweetText,
          tweetAt: new Date(),
          createdAt: new Date(),
          updatedAt: FildValue.serverTimestamp(),
        };

        // reserve tweet
        await firestore.collection(`twitter/v1/tweet`).add(tweet);
      })
    );

    res.json('success!');
  } catch (err) {
    console.error(err);
    res.json('error!');
  }
};
