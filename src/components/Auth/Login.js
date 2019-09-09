import React, { Component } from "react";
import UserDataManager from "./UserDataManager";
import {Button} from 'reactstrap'


class Login extends Component {
  state = {
    username: "",
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
    UserDataManager.checkUsers(this.state.username, this.state.password)
        .then(checkedUsers => {
            if (checkedUsers.length > 0) {
            sessionStorage.setItem("credentials", checkedUsers[0].id);
            this.props.history.push("/book");
            } else {
            alert("invalid username or password");
            }
        }
    );
  };

  componentDidMount() {
    // getAll users and put them in users array in state
    UserDataManager.getAllUsers().then(users => {
      this.setState({
        users: users
      });
    });
  }

  render() {
    console.log(this.state);
    return (
      <React.Fragment>
        <form onSubmit={this.handleLogin}>
          <fieldset className="loginSection">
            <h3>winnow</h3>
            <div className="loginForm">
              <input
                onChange={this.handleFieldChange}
                type="text"
                id="username"
                placeholder="username"
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
            <Button type="submit" color="primary">Sign In</Button>
            <p>or</p>
          </fieldset>
        </form>
      </React.Fragment>
    );
  }
}

export default Login;
