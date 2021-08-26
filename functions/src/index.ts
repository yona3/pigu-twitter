import { functions } from './lib/firebase';
import { twitterTestFunction } from './modules/testTweet';
import { autoReserve } from './modules/autoReserve';

export const test = functions.https.onRequest(twitterTestFunction);
export const auto_reserve = functions.https.onRequest(autoReserve);
