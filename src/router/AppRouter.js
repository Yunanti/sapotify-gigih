import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
// import "./App.css";
import { useSelector } from "react-redux";
import AuthRouter from "../pages/auth/AuthRouter";
import HomeRouter from "../pages/home/HomeRouter";
// import store from "../redux/store";

function AppRouter() {
  const { token } = useSelector((state) => state.token);
  return (
    <div className="App">
      <header>
        <h1 className="title text-white">Sapotify</h1>
      </header>
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
                <AuthRouter />
              )}
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default AppRouter;
