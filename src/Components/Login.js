import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import "../Styles/login.css";
import AppBar from "./AppBar";

const url = "http://localhost:8080/store/users/name/";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    getUser(username, password);
  }

  const getUser = async (username, password) => {
    const response = await fetch(`users/name/${username}`);
    if (response.statusText === "Internal Server Error") {
      alert("Invalid username");
    }
    const user = await response.json();
    if (user.password === password) {
      alert("Login successfull");
    } else {
      alert("Invalid password");
    }
  };
  return (
    <>
      <AppBar></AppBar>

      <h1 style={{ marginLeft: "2rem", marginTop: "2rem" }}>Login</h1>
      <div className="loginformcontainer">
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input
              autoFocus={true}
              type="text"
              value={username}
              placeholder="Username..."
              name="username"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="username">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>

          <Button size="lg" type="submit" disabled={!validateForm()}>
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}
