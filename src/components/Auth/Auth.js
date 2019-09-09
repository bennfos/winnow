import React, { Component } from 'react';
import Login from "./Login"
import RegisterModal from "./RegisterModal"

class Auth extends Component {
    render() {
        return (
            <React.Fragment>
                <Login {...this.props}/>
                <RegisterModal {...this.props}/>
            </React.Fragment>
        )
    }
}

export default Auth