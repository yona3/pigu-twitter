import React, { VFC } from 'react';
import { Link } from 'react-router-dom';
import { PostCard } from '../../shared/PostCard';

export const Search: VFC = () => {
  return (
    <div>
      <div>
        <form
          className="
          border shadow-sm px-6 py-2 rounded-full 
          flex justify-between
          "
        >
          <input
            className="py-1 w-full focus:outline-none"
            type="text"
            placeholder="Search by id"
          />
          <button className="w-10 h-10 rounded-full">i</button>
        </form>
      </div>
      <div>
        <div className="mt-10 space-y-5">
          {/* {POSTS.map((post) => (
            <Link
              className="block"
              to={`/workspace/post/${post.id}`}
              key={post.id}
            >
              <PostCard post={post} />
            </Link>
          ))} */}
        </div>
      </div>
    </div>
  );
};
