import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import { Button } from 'semantic-ui-react'
import UserDataManager from './UserDataManager';
import BookDataManager from '../Books/BookDataManager'
import './Login.css';

class RegisterModal extends React.Component {
    state = {
            users: [],
            firstName: "",
            lastName: "",
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
            modal: false
        };


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

    //toggles modal
    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }


    handleRegister = event => {
        event.preventDefault();
        //Validate user input
        if (this.state.password !== this.state.confirmPassword) {
            alert("passwords do not match")
        } else if (this.state.users.find(user => user.username === this.state.username)) {
            alert("username already taken")
        }  else if (this.state.users.find(user => user.email === this.state.email)) {
        alert("this email address is already associated with an account")
        } else {

            //create a new user object
        const newUserObject = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            username: this.state.username,
            password: this.state.password
        }

            //post new user to database,
        UserDataManager.postUser(newUserObject)
            .then(user => {

            //create first book for user, and post, then close modal.
                const firstBookObject = {
                    userId: user.id,
                    title: "quotebook",
                    description: "we have created a quotebook for you, with inspiration for each day of the year.",
                    timestamp: new Date().toLocaleString(),
                    isBlank: false
                }
                BookDataManager.postBook(firstBookObject)
                .then(()=> {
                    alert("welcome to winnow. please sign in.")
                    this.toggle()
                })
            })
        }
    }


    render() {
        return (
            <div>
                <div className="registerbtn">
                    <Button onClick={this.toggle}>sign up</Button>
                </div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Sign up</ModalHeader>
                    <ModalBody>
                        <div>
                            <Input onChange={this.handleFieldChange} type="text"
                                    id="firstName"
                                    placeholder="first name"
                                    value={this.state.firstName}
                                    required
                                /><br/>
                            <Input onChange={this.handleFieldChange} type="text"
                                    id="lastName"
                                    placeholder="last name"
                                    value={this.state.lastName}
                                    required
                                /><br/>
                            <Input onChange={this.handleFieldChange} type="email"
                                    id="email"
                                    placeholder="email"
                                    value={this.state.email}
                                    required
                                    autoFocus=""
                                /><br/>
                            <Input onChange={this.handleFieldChange} type="text"
                                    id="username"
                                    placeholder="username"
                                    value={this.state.username}
                                    required
                                /><br/>
                            <Input onChange={this.handleFieldChange} type="password"
                                    id="password"
                                    placeholder="password"
                                    value={this.state.password}
                                    required
                                /><br/>
                            <Input onChange={this.handleFieldChange} type="password"
                                    id="confirmPassword"
                                    placeholder="confirm password"
                                    required
                                />
                        </div>

                    </ModalBody>
                    <ModalFooter>
                        <Button
                            primary
                            onClick={this.handleRegister}
                            >Sign up</Button>

                        <Button onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default RegisterModal;