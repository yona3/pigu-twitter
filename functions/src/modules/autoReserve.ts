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

const getRandomPostIds = async () => {
  const indexDoc = await firestore.doc('index/v2').get();
  if (!indexDoc.exists) throw new Error("doc('index/v2') data is empty");

  return indexDoc.data() as { allPosts: string[] };
};

const getReserveLength = async () => {
  const systemTweetReserveSnapshot = await firestore
    .collection('twitter/v1/system/tweet/reserve')
    .get();
  if (systemTweetReserveSnapshot.empty)
    throw new Error("doc('twitter/v1/system/tweet/reserve') data is empty");

  const systemTweetReserve =
    systemTweetReserveSnapshot.docs[0].data() as SystemTweetReserve;

  return systemTweetReserve.length;
};

const getBlackList = async () => {
  const systemBlackPostsSnapshot = await firestore
    .collection('twitter/v1/system/tweet/blackPosts')
    .get();
  if (systemBlackPostsSnapshot.empty)
    throw new Error("doc('twitter/v1/system/tweet/blackPosts') not found");

  return systemBlackPostsSnapshot.docs.map((doc) => doc.id);
};

const generateRandomPostIds = ({
  index,
  reserveLength,
  systemBlackPostsIds,
}: {
  index: { allPosts: string[] };
  reserveLength: number;
  systemBlackPostsIds: string[];
}) => {
  let result: string[] = [];
  for (let i = 0; i < reserveLength; ) {
    const randomIndex = generateRandomNumber(0, index.allPosts.length - 1);

    if (
      !result.includes(index.allPosts[randomIndex]) &&
      !systemBlackPostsIds.includes(index.allPosts[randomIndex])
    ) {
      result = [...result, index.allPosts[randomIndex]];
      i++;
    }
  }
  return result;
};

const getInterval = async () => {
  const systemTweetIntervalSnapshot = await firestore
    .collection('twitter/v1/system/tweet/interval')
    .get();
  if (systemTweetIntervalSnapshot.empty)
    throw new Error("doc('twitter/v1/system/tweet/interval') data is empty");

  return systemTweetIntervalSnapshot.docs[0].data() as SystemTweetInterval;
};

const getStartTime = async () => {
  const systemTweetOperationTimeSnapshot = await firestore
    .collection('twitter/v1/system/tweet/operationTime')
    .get();
  if (systemTweetOperationTimeSnapshot.empty)
    throw new Error(
      "doc('twitter/v1/system/tweet/operationTime') data is empty"
    );

  const systemTweetOperationTime =
    systemTweetOperationTimeSnapshot.docs[0].data() as SystemTweetOperationTime;

  return systemTweetOperationTime.start;
};

const getTweetAt = (tweetTime: number) => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const tweetAt = generateDate(`${year}-${month}-${date + 1} ${tweetTime}:00`);
  tweetAt.setHours(tweetAt.getHours() - 9); // UTC

  return tweetAt;
};

// main
export const autoReserve = async (_: functions.EventContext) => {
  try {
    const [index, reserveLength, systemBlackPostsIds] = await Promise.all([
      getRandomPostIds(),
      getReserveLength(),
      getBlackList(),
    ]);

    // generate random post id array
    const randomPostIds = generateRandomPostIds({
      index,
      reserveLength,
      systemBlackPostsIds,
    });

    const [systemTweetInterval, startTime] = await Promise.all([
      getInterval(),
      getStartTime(),
    ]);

    // get random posts and reserve
    await Promise.all(
      randomPostIds.map(async (postId, i) => {
        // get post
        const postDoc = await firestore.doc(`posts/${postId}`).get();
        if (!postDoc.exists) return;

        const post = postDoc.data() as Post;

        // get user
        const userDoc = await firestore.doc(`users/${post.uid}`).get();
        if (!userDoc.exists) return;

        const user = userDoc.data() as User;

        // create tweet
        const tweetText = createTweetText(post, user);
        console.log('tweetText: ', tweetText);
        const tweetTime = startTime + systemTweetInterval.h * i; // h
        const tweetAt = getTweetAt(tweetTime);

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
