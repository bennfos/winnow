import React, { Component } from 'react';
import Login from "./Login"
import RegisterModal from "./RegisterModal"
import './Login.css'

class Auth extends Component {
    render() {
        return (
            <React.Fragment>
                <Login {...this.props}/>
                <RegisterModal className="registerbtn" {...this.props}/>
            </React.Fragment>
        )
    }
}

export default Auth