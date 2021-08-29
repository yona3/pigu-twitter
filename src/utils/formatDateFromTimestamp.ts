import { formatDate } from '../lib/day';
import { Timestamp } from '../lib/db';

export const formatDateFromTimestamp = (tweetAt: Timestamp) => {
  const millis = tweetAt.toMillis();
  return formatDate(millis, 'YYYY/MM/DD HH:mm');
};
