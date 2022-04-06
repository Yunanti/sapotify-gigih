import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
// import AuthClass from "./pages/auth/AuthClass";
// import AuthRouter from "./pages/auth/AuthRouter";
// import HomeRouter from "./pages/home/HomeRouter";
import store from "./redux/store";
import AppRouter from "./router/AppRouter";

function App() {
  // const { token } = useSelector((state) => state.token);
  return (
    
      <Provider store={store}>
        <AppRouter />
      </Provider>
    
  );
}

export default App;
