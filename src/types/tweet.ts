import { Timestamp, FieldValue } from '../lib/db';

export type TweetDocument = {
  postId: string;
  text: string;
  tweetAt: Timestamp | Date;
  createdAt: Timestamp | Date;
  updatedAt: FieldValue;
};

export type Tweet = {
  tweetId: string;
} & TweetDocument;
