import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import AuthRouter from '../pages/auth/AuthRouter';
import HomeRouter from '../pages/home/HomeRouter';

function AppRouter() {
  const { token } = useSelector((state) => state.token);
  return (
    <div className="App">
      <AuthRouter />
      <Router>
        <Switch>
          <Route path="/create-playlist">
            {token ? <HomeRouter /> : <Redirect to="/" />}
          </Route>
          <Route path="/">
            <div className="tbl">
              {token ? (
                <Redirect exact from="/" to="/create-playlist" />
              ) : (
                <div className="text-white">
                  <h2>Hello!</h2>
                  <p>Please login first</p>
                </div>
              )}
            </div>
          </Route>
        </Switch>
      </Router>
      <footer>
        <p className="footer-p">Copyright 2022 by Yunanti Moga Hasanah</p>
      </footer>
    </div>
  );
}

export default AppRouter;
