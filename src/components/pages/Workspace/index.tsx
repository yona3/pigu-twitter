import React, { VFC } from 'react';
import { Link, Route, Switch, useLocation } from 'react-router-dom';
import { Layout } from '../../shared/Layout';
import { Tweet } from './Tweet';
import { Search } from './Search';
import { ReservationSetting } from './ReservationSetting';
import { PostSetting } from './PostSetting';

export const Workspace: VFC = () => {
  const { pathname } = useLocation();
  const isSearchPage = pathname.includes('/search');
  const isTweetPage = pathname === '/workspace';
  const activeStyle = 'font-semibold text-gray-800';

  return (
    <Layout>
      <h1 className="text-lg sm:text-xl text-center">Workspace</h1>
      <nav className="mt-8">
        <ul className="flex justify-center space-x-5 text-gray-500 underline">
          <li>
            <Link to="/workspace">
              <p className={`${isTweetPage ? activeStyle : ''}`}>Tweet</p>
            </Link>
          </li>
          <li>
            <Link to="/workspace/search">
              <p className={`${isSearchPage ? activeStyle : ''}`}>Search</p>
            </Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route exact path="/workspace">
          <div className="mt-10">
            <Tweet />
          </div>
        </Route>
        <Route path="/workspace/search">
          <div className="mt-10">
            <Search />
          </div>
        </Route>
        <Route path="/workspace/tweet/:id">
          <div className="mt-10">
            <ReservationSetting />
          </div>
        </Route>
        <Route path="/workspace/post/:id">
          <div className="mt-10">
            <PostSetting />
          </div>
        </Route>
      </Switch>
    </Layout>
  );
};
