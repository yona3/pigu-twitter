import React, { VFC } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { meState } from '../../state';

export const Header: VFC = () => {
  const me = useRecoilValue(meState);

  return (
    <header className="bg-blue-500">
      <div
        className="
          max-w-5xl h-16 mx-auto px-6 
          flex justify-between items-center
        "
      >
        <Link to="/">
          <h1 className="text-white text-xl sm:text-2xl font-normal">
            pigu twitter
          </h1>
        </Link>

        {me && (
          <nav
            className="
            flex justify-between items-center text-white
            w-32 sm:w-40
          "
          >
            <Link to="/workspace">
              <div className="text-sm sm:text-base">
                <p>WorkSpace</p>
              </div>
            </Link>

            <Link to="/setting">
              <div
                className="
              bg-gray-500 h-8 w-8 sm:h-10 sm:w-10 rounded-full 
              flex justify-center items-center text-sm sm:text-base
            "
              >
                <p>K</p>
              </div>
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};
