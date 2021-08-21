import React, { VFC } from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import { Layout } from '../shared/Layout';
import { Tweet } from '../shared/Tweet';
import { Search } from '../shared/Search';

export const Workspace: VFC = () => {
  const match = useRouteMatch();
  console.log('match: ', match);

  return (
    <Layout>
      <h1 className="text-lg sm:text-xl text-center">Workspace</h1>
      <nav className="mt-8">
        <ul className="flex justify-center space-x-5 text-gray-500 underline">
          <li>
            <Link to="/workspace">Tweet</Link>
          </li>
          <li>
            <Link to="/workspace/search">Search</Link>
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
            <h1>tweet detail</h1>
          </div>
        </Route>
        <Route path="/workspace/post/:id">
          <div className="mt-10">
            <h1>post detail</h1>
          </div>
        </Route>
      </Switch>
    </Layout>
  );
};
