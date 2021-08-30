import "./App.css";
import React, { Component } from "react";
import Login from "./Components/Login";
import Navbar from "./Components/AppNavBar";
class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Route exact path="/login">
          <Login />
        </Route>
      </div>
    );
  }
}
export default App;
