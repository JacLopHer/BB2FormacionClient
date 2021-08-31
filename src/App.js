import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { useState } from "react";
import Home from "./components/Home";
import Error from "./components/Error";
import ListItems from "./components/ListItems";
import ListUsers from "./components/ListUsers";
import Login from "./components/Login";
import EditItem from "./components/edits/EditItem";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}>
          <Home />
        </Route>
        <Route exact path="/login" component={Login}>
          <Login />
        </Route>
        <Route exact path="/items" component={ListItems}>
          <ListItems />
        </Route>
        <Route path="/items/details/:id" component={EditItem}>
          <EditItem />
        </Route>
        <Route exact path="/users" component={ListUsers}>
          <ListUsers />
        </Route>
        <Route path="*" component={Error}>
          <Error />
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
