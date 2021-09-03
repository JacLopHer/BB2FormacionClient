import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import "../Styles/login.css";
import { FormControl, Grid } from "@material-ui/core";
import { AppBar } from "@material-ui/core";
import axios from "axios";

const url = "http://localhost:8080/authenticate";

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const user_object = {
      username: username,
      password: password,
    };
    axios.post(url, user_object).then((res) => {
      localStorage.setItem("authorization", res.data.token);
      console.log(localStorage.getItem);
      return handleDashboard();
    });
  }

  function handleDashboard() {
    axios
      .get("http://localhost:8080/dashboard", {
        headers: {
          Authorization: localStorage.getItem("authorization"),
        },
      })
      .then((res) => {
        console.log(res.data);
        console.log(localStorage.getItem("authorization"));
        props.history.push("/home");
        if (res.data === "success") {
          props.history.push("/home");
        } else {
          alert("Authentication failure");
        }
      });
  }

  // const getUser = async (username, password) => {
  //   const response = await fetch(`users/name/${username}`);
  //   if (response.statusText === "Internal Server Error") {
  //     alert("Invalid username");
  //   }
  //   const user = await response.json();
  //   if (user.password === password) {
  //     alert("Login successfull");
  //     props.history.push("/items");
  //   } else {
  //     alert("Invalid password");
  //   }
  // };
  return (
    <>
      <AppBar></AppBar>
      <h1 style={{ marginLeft: "2rem", marginTop: "2rem" }}>Login</h1>
      <div className="loginformcontainer">
        <Form onSubmit={handleSubmit} container>
          <Grid>
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
            <div>
              <Grid container>
                <FormGroup>
                  <Button size="lg" type="submit" disabled={!validateForm()}>
                    Submit
                  </Button>
                </FormGroup>
              </Grid>
            </div>
          </Grid>
        </Form>
      </div>
    </>
  );
}
