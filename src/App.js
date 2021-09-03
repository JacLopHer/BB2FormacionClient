import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { useState } from "react";
import Home from "./components/Home";
import Error from "./components/Error";
import ListItems from "./components/ListItems";
import ListUsers from "./components/ListUsers";
import Login from "./components/Login";
import EditItem from "./components/edits/EditItem";
import UserEdit from "./components/edits/UserEdit";
import NewItem from "./components/NewItem";
import dashboard from "./components/dashboard";
import interceptors from "./interceptors/interceptors";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login}></Route>
        <Route exact path="/home" component={Home}></Route>
        <Route exact path="/items" component={ListItems}></Route>
        <Route path="/items/details/:id" component={EditItem}></Route>
        <Route path="/items/newItem" component={NewItem}></Route>
        <Route exact path="/users" component={ListUsers}></Route>
        <Route path="/users/:id" component={UserEdit} />

        <Route path="/dashboard" component={dashboard}></Route>
        <Route path="*" component={Error}></Route>
      </Switch>
    </Router>
  );
}

export default App;
