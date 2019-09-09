import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class AddBookModal extends Component {

//Defines initial state
    state = {
        books: [],
        userId: parseInt(sessionStorage.getItem("credentials")),
        title: "",
        description: "",
        timestamp: "",
    };

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            userId: "",
            title: "",
            description: "",
            timestamp: "",
            modal: false
        };

        this.toggle = this.toggle.bind(this);
    }

//Displays/hides the new article modal
    toggle() {
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
        event.preventDefault();

    //Validates user input
        if (this.state.title === ""||
        this.state.description === "") {
            alert("please fill out all fields");
        } else {
            this.setState({ loadingStatus: true });

        //creates a new object for the edited news item,
            const newBook = {
                title: this.state.title,
                description: this.state.description,
                timestamp: new Date().toLocaleString()
            };

        //posts the object to the database, gets all news items, updates state of news array
            this.props.addBook(newBook)

        //closes the modal
            .then(this.toggle)
    }
};

    render(){
        return(
            <>
                <section className="eventSectionContent">
                    <Button type="button"
                    color="success"
                    onClick={this.toggle}>
                    add book
                    </Button>
                </section>
                <div>
                    <Modal
                        isOpen={this.state.modal}
                        toggle={this.toggle}
                        className={this.props.className}
                    >
                        <ModalHeader toggle={this.toggle}>add book</ModalHeader>
                        <ModalBody>
                            <form>
                                <fieldset>
                                    <div className="newBookForm">
                                    <input onChange={this.handleFieldChange} type="text"
                                            id="title"
                                            placeholder="title"
                                            required
                                            autoFocus=""
                                        /><br/>
                                        <textarea onChange={this.handleFieldChange}
                                            id="description"
                                            placeholder="description"
                                            required
                                        /><br/>
                                    </div>
                                </fieldset>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.constructNewBook}>save</Button>{' '}
                            <Button color="secondary" onClick={this.toggle}>cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </>
        )
    }
}

export default AddBookModal