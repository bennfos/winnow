import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Input} from 'reactstrap';
import { Button, Icon } from 'semantic-ui-react'
import QuoteDataManager from './QuoteDataManager'


class EditQuoteModal extends Component {

//Defines initial state
    state = {
        quotes: [],
        quoteText: "",
        quoteAuthor: "",
        timestamp: "",
        loadingStatus: false,
    };

    constructor(props) {
        super(props);
        this.state = {
            quotes: [],
            quoteText: "",
            quoteAuthor: "",
            modal: false
        };

        this.toggle = this.toggle.bind(this);
    }

//Displays/hides the edit modal
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
    };


    editExistingQuote = (event) => {
        event.preventDefault();

    //Validates user input
        if (this.state.quoteText === ""
        ) {
            alert("please provide the quote text");
        } else {
            this.setState({ loadingStatus: true });

        //creates a new object for the edited news item,
            const editedQuote = {
                id: this.props.pageQuote.quote.id,
                userId: parseInt(sessionStorage.getItem("credentials")),
                quoteText: this.state.quoteText,
                quoteAuthor: this.state.quoteAuthor,
                timestamp: this.props.pageQuote.quote.timestamp,
            };
        //posts the object to the database
            this.props.postEditedQuote(editedQuote, this.props.pageId)
        //closes the modal
            .then(this.toggle)
        }
    }


//Gets the id of the news item that is being edited and sets state to populate the input fields
    componentDidMount() {
        QuoteDataManager.getQuote(this.props.pageQuote.quote.id)
        .then(quote => {
            console.log(this.props.pageQuote.quote.id)
            this.setState({
            quoteText: quote.quoteText,
            quoteAuthor: quote.quoteAuthor,
            timestamp: this.props.pageQuote.quote.timestamp,
            loadingStatus: false,
            });
            console.log(this.state)
        });
    }

    render(){
        return(
            <>
                <section className="quoteSectionContent">
                    <Icon
                    type="button"
                    onClick={this.toggle}
                    name='edit outline'>
                    </Icon>
                </section>

                <div>
                    <Modal isOpen={this.state.modal} toggle={this.toggle}
                    className={this.props.className}
                    >
                        <ModalHeader toggle={this.toggle}>edit quote</ModalHeader>
                            <ModalBody>

                                <div className="editBookForm">
                                    <Input onChange={this.handleFieldChange} type="textarea"
                                        id="quoteText"
                                        value={this.state.quoteText}
                                        required
                                        autoFocus=""
                                    /><br/>
                                    <Input onChange={this.handleFieldChange} type="text"
                                        id="quoteAuthor"
                                        value={this.state.quoteAuthor}
                                        required
                                    /><br/>
                                </div>

                            </ModalBody>
                        <ModalFooter>
                            <Button primary onClick={this.editExistingQuote}>save</Button>
                            <Button secondary onClick={this.toggle}>cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
        </>
        )
    }
}

export default EditQuoteModal