import React, { Component } from "react";
import UserDataManager from "./UserDataManager";

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
    UserDataManager.checkUsers(this.state.email, this.state.password).then(
      checkedUsers => {
        if (checkedUsers.length > 0) {
          sessionStorage.setItem("credentials", checkedUsers[0].id);
          this.props.history.push("/chat");
        } else {
          alert("Invalid email or password.");
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
            <h3>Please Log In</h3>
            <div className="loginForm">
              <input
                onChange={this.handleFieldChange}
                type="email"
                id="email"
                placeholder="Email address"
                required
                autoFocus=""
              /><br/>
              <input
                onChange={this.handleFieldChange}
                type="password"
                id="password"
                placeholder="Password"
                required
              />
            </div>
            <button type="submit">Sign In</button>
            <p>Or</p>
          </fieldset>
        </form>
      </React.Fragment>
    );
  }
}

export default Login;
