import React, { VFC } from 'react';
import { Layout } from '../shared/Layout';

export const Setting: VFC = () => {
  return (
    <Layout>
      <h1 className="text-lg sm:text-xl text-center">Setting</h1>
      <div className="mt-5">
        <div>
          <p>Name: yona</p>
          <p>Email: yonajs208@gmail.com</p>
        </div>

        <div className="mt-5">
          <button className="underline text-gray-500">Logout</button>
        </div>
      </div>
    </Layout>
  );
};
