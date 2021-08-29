import React, { VFC } from 'react';
import { Link } from 'react-router-dom';
import { Tweet } from '../../types';
import { extractPostDataFromReservation } from '../../utils/extractPostDataFromReservation';
import { TweetCardButton } from './TweetCardButton';

type Props = {
  tweet: Tweet;
};

export const TweetCard: VFC<Props> = ({ tweet }) => {
  const { postId, tweetId } = tweet;
  const { title, userName, tweetAt } = extractPostDataFromReservation(tweet);

  return (
    <div className="rounded-md p-6 shadow-md border">
      <div>
        <h3 className="text-lg sm:text-xl font-bold">{title}</h3>
        <div
          className="
            flex items-center text-gray-600 
            text-sm sm:text-base mt-4
          "
        >
          <p className="mr-5">
            By: <span>{userName}</span>
          </p>
          <p>
            予定時刻: <span>{tweetAt}</span>
          </p>
        </div>
      </div>
      <div
        className="
        flex flex-col sm:flex-row 
        space-y-1 sm:space-y-0 sm:space-x-2 mt-6
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
