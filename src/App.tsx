import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <p>home</p>
        </Route>
        <Route path="/setting">
          <p>setting</p>
        </Route>
        <Route path="/workspace">
          <p>workspace</p>
        </Route>
        <Route path="*">
          <p>404</p>
        </Route>
      </Switch>
    </Router>
  );
};
