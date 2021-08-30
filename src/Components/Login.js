import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import "../Styles/login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <>
      <div className="loginformcontainer">
        <h1>Login</h1>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="username">Email</Label>
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
