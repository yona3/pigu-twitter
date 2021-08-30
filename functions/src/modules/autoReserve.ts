import { generateDate } from '../lib/day';
import { FieldValue, firestore, functions } from '../lib/firebase';
import {
  Post,
  SystemTweetInterval,
  SystemTweetOperationTime,
  SystemTweetReserve,
  User,
} from '../model';
import { TweetDocument } from '../model/Tweet';
import { createTweetText } from '../utils/createTweetText';
import { generateRandomNumber } from '../utils/generateRandomNumber';

// todo
// isEnable
// black date

export const autoReserve = async (_: functions.EventContext) => {
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

    // get black post list
    const systemBlackPostsSnapshot = await firestore
      .collection('twitter/v1/system/tweet/blackPosts')
      .get();
    if (systemBlackPostsSnapshot.empty)
      throw new Error("doc('twitter/v1/system/tweet/blackPosts') not found");

    const systemBlackPostsIds = systemBlackPostsSnapshot.docs.map(
      (doc) => doc.id
    );

    // create random post id array
    let randomPostIds: string[] = [];
    for (let i = 0; i < reserveLength; ) {
      const randomIndex = generateRandomNumber(0, index.allPosts.length - 1);

      if (
        !randomPostIds.includes(index.allPosts[randomIndex]) &&
        !systemBlackPostsIds.includes(index.allPosts[randomIndex])
      ) {
        randomPostIds = [...randomPostIds, index.allPosts[randomIndex]];
        i++;
      }
    }

    // get interval
    const systemTweetIntervalSnapshot = await firestore
      .collection('twitter/v1/system/tweet/interval')
      .get();
    if (systemTweetIntervalSnapshot.empty)
      throw new Error("doc('twitter/v1/system/tweet/interval') not found");
    const systemTweetInterval =
      systemTweetIntervalSnapshot.docs[0].data() as SystemTweetInterval;
    if (!systemTweetInterval)
      throw new Error("doc('twitter/v1/system/tweet/interval') data is empty");

    // get start time
    const systemTweetOperationTimeSnapshot = await firestore
      .collection('twitter/v1/system/tweet/operationTime')
      .get();
    if (systemTweetOperationTimeSnapshot.empty)
      throw new Error("doc('twitter/v1/system/tweet/operationTime') not found");
    const systemTweetOperationTime =
      systemTweetOperationTimeSnapshot.docs[0].data() as SystemTweetOperationTime;
    if (!systemTweetOperationTime)
      throw new Error(
        "doc('twitter/v1/system/tweet/operationTime') data is empty"
      );

    const startTime = systemTweetOperationTime.start;

    // get random posts
    await Promise.all(
      randomPostIds.map(async (postId, i) => {
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
        const tweetText = createTweetText(post, user);
        const tweetTime = startTime + systemTweetInterval.h * i; // h

        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const date = now.getDate();
        const tweetAt = generateDate(
          `${year}-${month}-${date + 1} ${tweetTime}:00`
        );
        console.log('tweetAt: ', tweetAt);
        tweetAt.setHours(tweetAt.getHours() - 9); // UTC

        const tweet: TweetDocument = {
          postId: post.id,
          text: tweetText,
          tweetAt,
          createdAt: new Date(),
          updatedAt: FieldValue.serverTimestamp(),
        };

        // reserve tweet
        await firestore.collection(`twitter/v1/tweet`).add(tweet);
      })
    );

    console.log('auto reserve success!');
  } catch (err) {
    console.log('auto reserve failed!', err);
  }
};
