import React, { Component } from "react"
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


class NavBar extends Component {

    logout = () => {
        sessionStorage.clear()
    }

    render() {
        return (
            <nav className="navbar navbar-light light-blue flex-md-nowrap p-0 shadow">
                <ul className="nav nav-pills nav-fill">
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/book">Book</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/search">Search</Link>
                    </li>
                    <li className="nav-item">
                        <Link onClick={this.logout} className="nav-link" to="/">Logout</Link>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default NavBar