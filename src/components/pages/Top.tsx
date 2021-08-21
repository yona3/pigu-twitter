import React, { VFC } from 'react';
import { useRecoilValue } from 'recoil';
import { POSTS } from '../../const/post';
import { useAuth } from '../../hooks/useAuth';
import { signInWithGoogle } from '../../lib/auth';
import { meState } from '../../state/atoms';
import { Layout } from '../shared/Layout';
import { TweetCard } from '../shared/TweetCard';

export const Top: VFC = () => {
  // const me = useRecoilValue(meState);
  const { me } = useAuth();
  console.log('me :', me);

  const signIn = () => signInWithGoogle();

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
          <h3 className="text-xl">
            This is pigu offical twitter management page 👋
          </h3>
          <button
            className="
              mt-2 text-base text-blue-500 
              hover:underline transition
            "
            onClick={signIn}
          >
            Login
          </button>
        </div>
      )}
    </Layout>
  );
};
