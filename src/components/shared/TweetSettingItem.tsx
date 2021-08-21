import React, { VFC } from 'react';

type Props = {
  name: string;
  children: React.ReactNode;
};

export const TweetSettingItem: VFC<Props> = ({ name, children }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold">{name}</h3>
      <div>{children}</div>
    </div>
  );
};
