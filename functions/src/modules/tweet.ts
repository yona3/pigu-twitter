import { firestore, functions } from '../lib/firebase';
import { twitter } from '../lib/twitter';
import { Post, TweetRequestData, User } from '../model';
import { createTweetText } from '../utils/createTweetText';

export const tweet = async (
  data: TweetRequestData,
  _: functions.https.CallableContext
) => {
  try {
    const { postId } = data;
    if (!postId) throw new Error('postId is required');

    // get post
    const postDoc = await firestore.doc(`posts/${postId}`).get();
    if (!postDoc.exists) throw new Error('post not found');

    const post = postDoc.data() as Post;
    const { uid } = post;

    // get user
    const userDoc = await firestore.doc(`users/${uid}`).get();
    if (!userDoc.exists) throw new Error('user not found');

    const user = userDoc.data() as User;

    // tweet
    const tweetText = createTweetText(post, user);
    await twitter.v1.tweet(tweetText);

    // if requested, delete reserve
    let reserveDeleted = false;
    if (data.reserve) {
      try {
        const { reserveId, isReserved, deleteReserve } = data.reserve;

        // check if reserve exists and deletable
        if (!isReserved || !deleteReserve)
          throw new Error('The reserve was set, but no deletion was done.');

        const reserveRef = firestore.doc(`twitter/v1/tweet/${reserveId}`);

        const deleteReserveTransaction = await firestore.runTransaction(
          async (transaction) => {
            const reserveDoc = await transaction.get(reserveRef);
            if (!reserveDoc.exists) throw new Error('reserve not found');
            transaction.delete(reserveRef);
            return 'success!';
          }
        );

        if (deleteReserveTransaction === 'success!') reserveDeleted = true;
      } catch (err) {
        console.error(err);
      }
    }

    return {
      ok: true,
      tweetText,
      reserveDeleted,
    };
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      return {
        ok: false,
        error: err.message,
      };
    } else {
      console.error(err);
      return {
        ok: false,
        error: err,
      };
    }
  }
};
