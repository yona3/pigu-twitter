import { Request, Response } from 'firebase-functions/v1';
import { firestore } from './lib/firebase';

const fetchShceduledTweets = async () => {
  const snapshot = await firestore.collection('twitter/v1/tweet').get();
  snapshot.forEach((doc) => {
    const tweet = doc.data();
    console.log(tweet);
  });
};

export const twitterTestFunction = async (_: Request, res: Response) => {
  try {
    await fetchShceduledTweets();
    res.json('success!');
  } catch (err) {
    console.error(err.message);
    res.json('error!');
  }
};
