import { functions } from './lib/firebase';

import {
  tweet as tweetFn,
  autoReserve as autoReserveFn,
  autoTweet as autoTweetFn,
} from './modules';

// todo v1
// [ ] tweet (manual - https)
// [x] auto_tweet (auto - pub/sub)
// [x] auto_reserve (auto - pub/sub)

export const tweet = functions.region('us-central1').https.onCall(tweetFn);
export const auto_tweet = functions
  .region('asia-northeast1')
  .https.onRequest(autoTweetFn);
export const auto_reserve = functions
  .region('asia-northeast1')
  .https.onRequest(autoReserveFn);
