import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";
import Login from "./components/Login";
import Home from "./components/Home";
import Error from "./components/Error";
import ListItems from "./components/ListItems";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}>
          <Home />
        </Route>
        <Route path="/login" component={Login}>
          <Login />
        </Route>
        <Route path="/items" component={ListItems}>
          <Error />
        </Route>
        <Route path="*" component={Error}>
          <Error />
        </Route>
        <Route path="*" component={Error}>
          <Error />
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
