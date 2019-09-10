import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import UserDataManager from './UserDataManager';
import './Login.css';
import Winnow from '../Winnow';

class RegisterModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            firstName: "",
            lastName: "",
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
            modal: false
        };

        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        // getAll users and hand on
        UserDataManager.getAllUsers()
            .then(users => {
                this.setState({
                    users: users
                })
            })
    }

    handleFieldChange = event => {
        const stateToChange = {};
        stateToChange[event.target.id] = event.target.value;
        this.setState(stateToChange);

    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    handleRegister = event => {
        event.preventDefault();
        if (this.state.password !== this.state.confirmPassword) {
            alert("passwords do not match")
        } else if (this.state.users.find(user => user.username === this.state.username)) {
            alert("username already taken")
        }  else if (this.state.users.find(user => user.email === this.state.email)) {
        alert("this email address is already associated with an account")
        } else {
        const newUserObject = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            username: this.state.username,
            password: this.state.password
        }
        UserDataManager.postUser(newUserObject)
            .then(() =>
                alert("welcome to winnow. please sign in."))
            .then(()=>this.toggle())
        }
    }


    render() {
        return (
            <div>
                <Button className="registerbtn" onClick={this.toggle}>sign up</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Sign up</ModalHeader>
                    <ModalBody>
                    <form>
                        <fieldset>
                            <div className="loginForm">
                            <input onChange={this.handleFieldChange} type="text"
                                    id="firstName"
                                    placeholder="first name"
                                    value={this.state.firstName}
                                    required
                                /><br/>
                            <input onChange={this.handleFieldChange} type="text"
                                    id="lastName"
                                    placeholder="last name"
                                    value={this.state.lastName}
                                    required
                                /><br/>
                            <input onChange={this.handleFieldChange} type="email"
                                    id="email"
                                    placeholder="email"
                                    value={this.state.email}
                                    required
                                    autoFocus=""
                                /><br/>
                            <input onChange={this.handleFieldChange} type="text"
                                    id="username"
                                    placeholder="username"
                                    value={this.state.username}
                                    required
                                /><br/>
                            <input onChange={this.handleFieldChange} type="password"
                                    id="password"
                                    placeholder="password"
                                    value={this.state.password}
                                    required
                                /><br/>
                            <input onChange={this.handleFieldChange} type="password"
                                    id="confirmPassword"
                                    placeholder="confirm password"
                                    required
                            />
                            </div>
                        </fieldset>
                    </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.handleRegister}>Sign up</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default RegisterModal;