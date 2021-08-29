import React, { VFC } from 'react';
import { TweetSettingItem } from '../../shared/TweetSettingItem';

export const Tweet: VFC = () => {
  return (
    <div>
      <div className="space-y-10">
        <TweetSettingItem name="Tweet Interval">
          <div>
            <input
              className="border border-gray-400 rounded mr-2 w-10 pl-2"
              type="number"
            />
            <span>h</span>
          </div>
        </TweetSettingItem>

        <TweetSettingItem name="Operating time">
          <div className="space-x-3 mt-3">
            <input
              className="border border-gray-400 rounded pl-2"
              type="time"
            />
            <span>~</span>
            <input
              className="border border-gray-400 rounded pl-2"
              type="time"
            />
          </div>
        </TweetSettingItem>

        <TweetSettingItem name="Sleep Date">
          <div>
            <p className="text-gray-500">This is unabailable now.</p>
            {/* <input
              className="border border-gray-400 rounded pl-2"
              type="date"
            /> */}
          </div>
        </TweetSettingItem>

        <TweetSettingItem name="Black List">
          <div>
            <div className="text-gray-400 underline cursor-pointer">
              show list
            </div>
            <div className="mt-3 flex">
              <input
                className="border border-gray-400 rounded-l px-1 focus:outline-none"
                type="text"
              />
              <button
                className="
                  bg-gray-600 text-white px-2
                  rounded-r
                "
              >
                +
              </button>
            </div>
          </div>
        </TweetSettingItem>
      </div>

      <div className="mt-12 text-center">
        <button
          className="
          bg-blue-500 hover:bg-blue-600 text-white 
            px-6 py-2 rounded transition
          "
        >
          Update
        </button>
      </div>
    </div>
  );
};
