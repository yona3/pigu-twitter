import { formatDate } from '../lib/day';
import { Timestamp } from '../lib/db';
import { Tweet } from '../types';

const parseTweetText = (text: string) => {
  const firstLine = text.split('\n')[0];
  const [title, userName] = firstLine.split('｜');
  return { title, userName };
};

const convertTweetAtToString = (tweetAt: Timestamp) => {
  const millis = tweetAt.toMillis();
  return formatDate(millis, 'YYYY/MM/DD HH:mm');
};

export const extractPostDataFromReservation = (tweet: Tweet) => {
  const { title, userName } = parseTweetText(tweet.text);
  const tweetAt = convertTweetAtToString(tweet.tweetAt as Timestamp);
  return { title, userName, tweetAt };
};
