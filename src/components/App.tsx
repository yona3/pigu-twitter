import React, { VFC } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { meState } from '../state/atoms';
import { Setting } from './pages/Setting';
import { Top } from './pages/Top';
import { Workspace } from './pages/Workspace';

export const App: VFC = () => {
  const me = useRecoilValue(meState);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Top />
        </Route>
        {me && (
          <>
            <Route path="/workspace">
              <Workspace />
            </Route>
            <Route path="/setting">
              <Setting />
            </Route>
          </>
        )}
        <Route path="*">
          <p>404</p>
        </Route>
      </Switch>
    </Router>
  );
};
