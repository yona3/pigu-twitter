import React, { VFC } from 'react';
import { POSTS } from '../../const/post';
import { Layout } from '../shared/Layout';
import { TweetCard } from '../shared/TweetCard';

export const Top: VFC = () => {
  return (
    <Layout>
      <h1 className="text-lg sm:text-xl text-center">Reserve</h1>
      <div className="space-y-5 mt-10">
        {POSTS.map((post) => (
          <div key={post.id}>
            <TweetCard post={post} />
          </div>
        ))}
      </div>
    </Layout>
  );
};
