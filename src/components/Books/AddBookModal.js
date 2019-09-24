import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import { Icon, Button } from 'semantic-ui-react'
import '../Books/Card.css'

class AddBookModal extends Component {

//Defines initial state
    state = {
        books: [],
        userId: parseInt(sessionStorage.getItem("credentials")),
        title: "",
        description: "",
        timestamp: "",
        modal: false
    };


//Displays/hides the new article modal
    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

//Sets state with input values as fields change
    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
        console.log(stateToChange)
    };

    constructNewBook = event => {

    //Validates user input
        if (this.state.title === "") {
            alert("please give your new quoebook a title");
        } else {
            this.setState({ loadingStatus: true });

        //creates a new object for the edited news item,
            const newBook = {
                title: this.state.title,
                userId: parseInt(sessionStorage.getItem("credentials")),
                description: this.state.description,
                timestamp: new Date().toLocaleString()
            };

        //posts the object to the database, gets all news items, updates state of news array
            this.props.addBook(newBook)

        //closes the modal
            .then(this.toggle)
    }
};


clearDescriptionInState = () => {
    this.setState({
        description: ""
    })
    console.log(this.state.description)
}

    render(){
        return(
            <>
                <div className="addCard" onClick={() => this.toggle()}>
                    <div className="addCard__content">
                        <div className="add__icon">
                            <Icon
                                className="addBookModal__button"
                                name="add"
                                onClick={() => {
                                    this.toggle()
                                }}
                                size="large">
                            </Icon>
                        </div>
                    </div>
                </div>
                <div>
                    <Modal
                        isOpen={this.state.modal}
                        toggle={this.toggle}
                        className={this.props.className}
                    >
                        <ModalHeader toggle={this.toggle}>add book</ModalHeader>
                        <ModalBody>
                            <div className="newBookForm">
                                <Input
                                    onChange={this.handleFieldChange}
                                    type="text"
                                    id="title"
                                    placeholder="title"
                                    required
                                    autoFocus=""
                                    /><br/>
                                <Input onChange={this.handleFieldChange}
                                    type="textarea"
                                    id="description"
                                    placeholder="description"
                                    /><br/>
                            </div>

                        </ModalBody>
                        <ModalFooter>
                            <Button primary onClick={() => {
                                    this.constructNewBook()
                                    this.clearDescriptionInState()
                            }}
                            >save</Button>
                            <Button onClick={this.toggle}>cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </>
        )
    }
}

export default AddBookModal