import React, { VFC } from 'react';
import { Header } from './Header';

type Props = {
  children: React.ReactNode;
};

export const Layout: VFC<Props> = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
};