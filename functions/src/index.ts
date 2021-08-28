import { functions } from './lib/firebase';
import { twitterTestFunction } from './modules/testTweet';
import { autoReserve } from './modules/autoReserve';

// todo v1
// [ ] tweet
// [x] autoReserve
// [ ] tweetNow

export const test = functions
  .region('asia-northeast1')
  .https.onRequest(twitterTestFunction);
export const auto_reserve = functions
  .region('asia-northeast1')
  .https.onRequest(autoReserve);
