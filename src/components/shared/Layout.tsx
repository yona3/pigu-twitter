import React, { VFC } from 'react';
import { Header } from './Header';

type Props = {
  children: React.ReactNode;
};

export const Layout: VFC<Props> = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="max-w-5xl pt-8 px-6 mx-auto min-h-screen">
        {children}
      </main>
    </div>
  );
};
