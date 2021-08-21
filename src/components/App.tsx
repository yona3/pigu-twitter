import React, { useEffect, VFC } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { fetchPost } from '../lib/api';
import { Setting } from './pages/Setting';
import { Top } from './pages/Top';
import { Workspace } from './pages/Workspace';

export const App: VFC = () => {
  const logPost = async (postId: string) => {
    const doc = await fetchPost(postId);
    const data = doc.data();
    console.log(data);
  };

  useEffect(() => {
    logPost('3fK5f0bDg');
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Top />
        </Route>
        <Route path="/workspace">
          <Workspace />
        </Route>
        <Route path="/setting">
          <Setting />
        </Route>
        <Route path="*">
          <p>404</p>
        </Route>
      </Switch>
    </Router>
  );
};
