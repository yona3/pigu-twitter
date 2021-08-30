import { functions } from './lib/firebase';

import {
  tweet as tweetFn,
  autoReserve as autoReserveFn,
  autoTweet as autoTweetFn,
} from './modules';

// todo
// [ ] tweet (manual - https)
// [x] auto_tweet (auto - pub/sub) 2h
// [x] auto_reserve (auto - pub/sub) 1day 12:00

export const tweet = functions.region('us-central1').https.onCall(tweetFn);
export const auto_tweet = functions.pubsub
  .schedule('every 1 hours from 10:00 to 22:00')
  .timeZone('Asia/Tokyo')
  .onRun(autoTweetFn);
export const auto_reserve = functions.pubsub
  .schedule('every day 12:00')
  .timeZone('Asia/Tokyo')
  .onRun(autoReserveFn);
