import React, { VFC } from 'react';
import { Header } from './Header';

type Props = {
  children: React.ReactNode;
};

export const Layout: VFC<Props> = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="max-w-3xl pt-12 pb-20 px-6 mx-auto min-h-screen">
        {children}
      </main>
    </div>
  );
};
