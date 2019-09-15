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
        // event.preventDefault();

    //Validates user input
        if (this.state.quoteText === "") {
            alert("please provide the quote text");
        } else {
            this.setState({ loadingStatus: true });

        //creates a new object for the quote that is to be added,
            const newQuote = {
                quoteText: this.state.quoteText,
                userId: parseInt(sessionStorage.getItem("credentials")),
                quoteAuthor: this.state.quoteAuthor,
                timestamp: new Date().toLocaleString()
            };



        //posts the object to the database, gets all pageQuotes, and rerenders (see PageMain)
            this.props.addQuote(newQuote, this.props.pageId)



        //closes the modal
                .then(this.toggle)
    }
};

//this is called after a new quote is created and rendered to DOM.
//This fixes a bug that allowed users to add the same quote twice
//in a row without typing anything in the input fields the second time,
//becuase the quote text and author were already in state.
    resetQuoteState = () => {
        this.setState({
            quoteText: "",
            quoteAuthor: ""
        })
    }

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
                                        /><br/>

                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={ ()=> {
                                this.constructNewQuote()
                                setTimeout(this.resetQuoteState, 1000)
                                }}>save</Button>
                            <Button onClick={this.toggle}>cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </>
        )
    }
}

export default AddQuoteModal