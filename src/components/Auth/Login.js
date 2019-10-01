import React, { Component } from "react";
import UserDataManager from "./UserDataManager";
import { Button, Image } from 'semantic-ui-react'
import { Input } from 'reactstrap'
import logo from './agronomy.png'
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


  //check to see if username and password exist together in database and sets session storage
  handleLogin = event => {
    event.preventDefault();
    UserDataManager.checkUsers(this.state.username, this.state.password).then(
      checkedUsers => {
        if (checkedUsers.length > 0) {
          sessionStorage.setItem("credentials", checkedUsers[0].id);
          this.props.history.push("/quote");
        } else {
          alert("Invalid username or password.");
        }
      }
    );
  };


  componentDidMount() {
    // getAll users and  set in session storage

    UserDataManager.getAllUsers().then(users => {
      this.setState({
        users: users
      });
    });
  }




  render() {
    return (
      <React.Fragment>
        <div className="login">
          <div className="login__heading">
            <Image className="logo" src={logo}/>
            <h1 style={{color: 'rgb(85, 85, 85)'}} ><strong>winnow</strong></h1>
          </div>
          <div className="login__description--1">
            <h4><em>Marcus Aurelius wrote that we should</em>
              <strong> winnow </strong><em>our thoughts, so that we always
              have something meaningful to think and
              talk about.</em></h4>
          <div className="login__description--2">
              <h4><em>Create a daily quote book to winnow the
              chaff of media noise, and collect a few
              grains of wisdom.</em></h4>
          </div>
          </div>
            <div className="loginForm">
              <Input
                onChange={this.handleFieldChange}
                type="username"
                id="username"
                placeholder="username"
                required
                autoFocus=""
                className="input"
              /><br/>
              <Input
                onChange={this.handleFieldChange}
                type="password"
                id="password"
                placeholder="password"
                required
                className="input"
              />
            </div>
            <div className="signIn">
              <Button
                className="signIn_button"
                type="submit"
                onClick={this.handleLogin}
                >sign in</Button>
              <div className="or">
                <h6>or</h6>
              </div>
            </div>
          </div>
      </React.Fragment>
    );
  }
}

export default Login;
