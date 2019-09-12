import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input } from 'reactstrap';
import { Button, Icon } from 'semantic-ui-react'
import QuoteDataManager from './QuoteDataManager'

class AddQuoteModal extends Component {

//Defines initial state
    state = {
        quotes: [],
        userId: parseInt(sessionStorage.getItem("credentials")),
        quoteText: "",
        quoteAuthor: "",
        timestamp: "",
        pageId: 0,
        quoteId: 0,
        pageQuoteId: 0
    };

    constructor(props) {
        super(props);
        this.state = {
            quotes: [],
            userId: parseInt(sessionStorage.getItem("credentials")),
            quoteText: "",
            quoteAuthor: "",
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

    constructNewQuote = event => {
        event.preventDefault();

    //Validates user input
        if (this.state.quoteText === ""||
        this.state.quoteAuthor === "") {
            alert("please fill out all fields");
        } else {
            this.setState({ loadingStatus: true });

        //creates a new object for the edited news item,
            const newQuote = {
                quoteText: this.state.quoteText,
                userId: parseInt(sessionStorage.getItem("credentials")),
                quoteAuthor: this.state.quoteAuthor,
                timestamp: new Date().toLocaleString()
            };



        //posts the object to the database, gets all news items, updates state of news array
            this.props.addQuote(newQuote)
                


        //closes the modal
                .then(this.toggle)
    }
};

    render(){
        return(
            <>
                <section className="quoteSectionContent">
                    <Button icon
                    onClick={this.toggle}
                    size='mini'>
                        <Icon name="add"/>
                    </Button>
                </section>
                <div>
                    <Modal
                        isOpen={this.state.modal}
                        toggle={this.toggle}
                        className={this.props.className}
                    >
                        <ModalHeader toggle={this.toggle}>add quote</ModalHeader>
                        <ModalBody>
                            <Form className="newQuoteForm">
                                <FormGroup>

                                    <Input onChange={this.handleFieldChange}
                                            type="textarea"
                                            id="quoteText"
                                            placeholder="text"
                                            required
                                            autoFocus=""
                                        /><br/>
                                    <Input onChange={this.handleFieldChange}
                                            type="text"
                                            id="quoteAuthor"
                                            placeholder="author"
                                            required
                                        /><br/>

                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={this.constructNewQuote}>save</Button>{' '}
                            <Button onClick={this.toggle}>cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </>
        )
    }
}

export default AddQuoteModal