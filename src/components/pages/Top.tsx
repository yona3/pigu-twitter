import React, { VFC } from 'react';
import { useRecoilValue } from 'recoil';
import { POSTS } from '../../const/post';
import { meState } from '../../state/atoms';
import { Layout } from '../shared/Layout';
import { TweetCard } from '../shared/TweetCard';

export const Top: VFC = () => {
  const me = useRecoilValue(meState);

  return (
    <Layout>
      {me ? (
        <>
          <h1 className="text-lg sm:text-xl text-center">Reserve</h1>
          <div className="space-y-5 mt-10">
            {POSTS.map((post) => (
              <div key={post.id}>
                <TweetCard post={post} />
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center">
          <button className="text-lg text-blue-500">Login</button>
        </div>
      )}
    </Layout>
  );
};
