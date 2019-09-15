import React, { Component } from "react";
import UserDataManager from "./UserDataManager";
import { Button, Input } from 'semantic-ui-react'

import "./Login.css";

class Login extends Component {
  state = {
    email: "",
    password: "",
    users: []
  };

  handleFieldChange = event => {
    const stateToChange = {};
    stateToChange[event.target.id] = event.target.value;
    this.setState(stateToChange);
  };

  handleLogin = event => {
    event.preventDefault();
    UserDataManager.checkUsers(this.state.username, this.state.password).then(
      checkedUsers => {
        if (checkedUsers.length > 0) {
          sessionStorage.setItem("credentials", checkedUsers[0].id);
          this.props.history.push("/books");
        } else {
          alert("Invalid username or password.");
        }
      }
    );
  };

  componentDidMount() {
    // getAll users and hand on
    UserDataManager.getAllUsers().then(users => {
      this.setState({
        users: users
      });
    });
  }

  render() {
    console.log(this.state.users);
    return (
      <React.Fragment>
        <form onSubmit={this.handleLogin}>
          <fieldset className="loginSection">
            <h3>winnow</h3>
            <div className="loginForm">
              <Input
                onChange={this.handleFieldChange}
                type="username"
                id="username"
                placeholder="username"
                required
                autoFocus=""
              /><br/>
              <Input
                onChange={this.handleFieldChange}
                type="password"
                id="password"
                placeholder="password"
                required
              />
            </div>
            <Button type="submit">sign in</Button>
            <p>or</p>
          </fieldset>
        </form>
      </React.Fragment>
    );
  }
}

export default Login;
