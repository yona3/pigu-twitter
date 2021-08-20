import React, { VFC } from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../../types';
import { TweetCardButton } from './TweetCardButton';

type Props = {
  post: Post;
};

export const TweetCard: VFC<Props> = ({ post }) => {
  const { title, createdBy } = post;

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
            By: <span>{createdBy}</span>
          </p>
          <p>
            予定時刻: <span>2021/8/22/10:00</span>
          </p>
        </div>
      </div>
      <div
        className="
        flex flex-col sm:flex-row 
        space-y-1 sm:space-y-0 sm:space-x-2 mt-6
        "
      >
        <Link className="w-full sm:w-1/2" to="/workspace/tweet/:id">
          <TweetCardButton className="bg-blue-500 hover:bg-blue-600">
            予約内容の変更
          </TweetCardButton>
        </Link>
        <Link className="w-full sm:w-1/2" to="workspace/post/:id">
          <TweetCardButton className="bg-gray-500 hover:bg-gray-600">
            投稿の設定
          </TweetCardButton>
        </Link>
      </div>
    </div>
  );
};
