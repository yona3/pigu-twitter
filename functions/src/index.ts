import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import { testTweet } from './testTweet';

admin.initializeApp();

export const test = functions.https.onRequest(testTweet);
