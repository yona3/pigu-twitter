import React, { VFC } from 'react';

type Props = {
  name: string;
  children: React.ReactNode;
};

export const TweetSettingItem: VFC<Props> = ({ name, children }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold">{name}</h3>
      <hr className="mt-2 border-gray-300" />
      <div className="mt-6">{children}</div>
    </div>
  );
};
