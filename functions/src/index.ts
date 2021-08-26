import { functions } from './lib/firebase';
import { twitterTestFunction } from './testTweet';

export const test = functions.https.onRequest(twitterTestFunction);
