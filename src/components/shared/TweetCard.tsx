import React, { VFC } from 'react';
import { Link } from 'react-router-dom';
import { Timestamp } from '../../lib/db';
import { Tweet } from '../../types';
import { formatDateFromTimestamp } from '../../utils/formatDateFromTimestamp';
import { TweetCardButton } from './TweetCardButton';

type Props = {
  tweet: Tweet;
};

export const TweetCard: VFC<Props> = ({ tweet }) => {
  const { postId, tweetId, text } = tweet;
  const tweetAt = formatDateFromTimestamp(tweet.tweetAt as Timestamp);
  const textLines = text.split('\n');

  return (
    <div className="rounded p-6 shadow border">
      <div>
        <pre
          className="
            text-base md:text-lg whitespace-normal break-words
            font-sans
          "
        >
          {textLines.map((line, index) => (
            <React.Fragment key={index}>
              <span
                className={`${
                  index + 1 - (textLines.length - 2) > 0
                    ? 'text-blue-500'
                    : 'text-gray-900'
                }`}
              >
                {line}
              </span>
              <br />
            </React.Fragment>
          ))}
        </pre>
        <div
          className="
            flex items-center text-gray-500 
            text-sm sm:text-base mt-4
          "
        >
          <p className="text-sm md:text-base">
            予定時刻: <span>{tweetAt}</span>
          </p>
        </div>
      </div>
      <div
        className="
        flex flex-col sm:flex-row 
        space-y-1 sm:space-y-0 sm:space-x-2 mt-4
        "
      >
        <Link className="w-full sm:w-1/2" to={`/workspace/tweet/${tweetId}`}>
          <TweetCardButton className="bg-blue-500 hover:bg-blue-600">
            予約内容の変更
          </TweetCardButton>
        </Link>
        <Link className="w-full sm:w-1/2" to={`workspace/post/${postId}`}>
          <TweetCardButton className="bg-gray-500 hover:bg-gray-600">
            投稿の設定
          </TweetCardButton>
        </Link>
      </div>
    </div>
  );
};
