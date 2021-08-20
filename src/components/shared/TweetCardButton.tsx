import React, { VFC } from 'react';

type Props = {
  children: React.ReactChild;
  className: string;
};

export const TweetCardButton: VFC<Props> = ({ children, className }) => {
  return (
    <button
      className={`
        border w-full py-2 rounded-md 
        text-white transition text-sm sm:text-base
        ${className}
      `}
    >
      {children}
    </button>
  );
};
