import React, { VFC } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { signOut } from '../../lib/auth';
import { meState } from '../../state/atoms';
import { Layout } from '../shared/Layout';

export const Setting: VFC = () => {
  const me = useRecoilValue(meState);

  return (
    <Layout>
      <h1 className="text-lg sm:text-xl text-center">Setting</h1>
      {me && (
        <div className="mt-10">
          <div className="space-y-2">
            <p>Name: {me.name}</p>
            <p>Email: {me.email}</p>
          </div>

          <div className="mt-5">
            <Link to="/">
              <button className="underline text-gray-500" onClick={signOut}>
                Logout
              </button>
            </Link>
          </div>
        </div>
      )}
    </Layout>
  );
};
