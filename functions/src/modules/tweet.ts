import { Request, Response } from 'firebase-functions/v1';
import { firestore } from '../lib/firebase';
import { Tweet } from '../model';

const fetchShceduledTweets = async () => {
  try {
    const snapshot = await firestore.collection('twitter/v1/tweet').get();
    snapshot.forEach((doc) => {
      const tweet = doc.data() as Tweet;
      console.log(tweet);
    });
  } catch (err) {
    console.error(err.message);
  }
};

export const tweet = async (_: Request, res: Response) => {
  try {
    await fetchShceduledTweets();
    res.json('success!');
  } catch (err) {
    console.error(err.message);
    res.json('error!');
  }
};
