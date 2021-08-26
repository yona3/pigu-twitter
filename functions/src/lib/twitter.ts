import { TwitterApi } from 'twitter-api-v2';
import { functions } from './firebase';

const config = functions.config();
const env = config['pigu-ryu'];

export const twitter = new TwitterApi({
  appKey: env['twitter-app-key'] || '',
  appSecret: env['twitter-app-secret'] || '',
  accessToken: env['twitter-access-token'] || '',
  accessSecret: env['twitter-access-secret'] || '',
});
