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
        text-white transition text-xs sm:text-sm
        ${className}
      `}
    >
      {children}
    </button>
  );
};
