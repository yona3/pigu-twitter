import { functions } from './lib/firebase';
import { twitterTestFunction } from './modules/testTweet';
import { autoReserve } from './modules/autoReserve';
import { autoTweet } from './modules/autoTweet';

// todo v1
// [x] autoTweet
// [x] autoReserve
// [ ] createOGP
// [ ] tweetNow

export const test = functions
  .region('asia-northeast1')
  .https.onRequest(twitterTestFunction);
export const auto_tweet = functions
  .region('asia-northeast1')
  .https.onRequest(autoTweet);
export const auto_reserve = functions
  .region('asia-northeast1')
  .https.onRequest(autoReserve);
