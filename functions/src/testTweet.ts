import { Response } from 'firebase-functions/v1';
import { Request } from 'firebase-functions/v1/https';
import { twitter } from './lib/twitter';

export const testTweet = async (_: Request, res: Response) => {
  try {
    await twitter.v1.tweet('test');
    res.json('success!');
  } catch (err) {
    console.error(err.message);
    res.json('error!');
  }
};
