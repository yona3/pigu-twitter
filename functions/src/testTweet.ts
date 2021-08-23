import * as functions from 'firebase-functions';
import { Response } from 'firebase-functions/v1';
import { Request } from 'firebase-functions/v1/https';
import { TwitterApi } from 'twitter-api-v2';

const config = functions.config();
const env = config['pigu-ryu'];

const twitter = new TwitterApi({
  appKey: env['twitter-app-key'] || '',
  appSecret: env['twitter-app-secret'] || '',
  accessToken: env['twitter-access-token'] || '',
  accessSecret: env['twitter-access-secret'] || '',
});

export const testTweet = async (_: Request, res: Response) => {
  try {
    await twitter.v1.tweet('こんばんは');
    res.json('success!');
  } catch (err) {
    console.error(err.message);
    res.json('error!');
  }
};
