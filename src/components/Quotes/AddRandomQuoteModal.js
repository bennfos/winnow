import React, { Component } from 'react'
import QuoteDataManager from './QuoteDataManager'
import { Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap'
import { Button } from 'semantic-ui-react'



class AddRandomQuoteModal extends Component {
    state = {
        quoteText: "",
        quoteAuthor: "",
        modal: false
      };

      toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

      handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
        console.log(stateToChange)
    };


        refreshRandomQuote = () => {
            QuoteDataManager.getRandomQuote()
                .then(quote => {
                    this.setState({
                        quoteText: quote.quoteText,
                        quoteAuthor: quote.quoteAuthor
                    })
            })
        }

        constructNewRandomQuote = event => {
            this.setState({ loadingStatus: true });
        //creates a new object for the quote that is to be added,
            const newRandomQuote = {
                quoteText: this.state.quoteText,
                userId: parseInt(sessionStorage.getItem("credentials")),
                quoteAuthor: this.state.quoteAuthor,
                timestamp: new Date().toLocaleString()
            };
        //posts the object to the database, gets all pageQuotes, and rerenders (see PageMain)
            this.props.addQuote(newRandomQuote, this.props.pageId)
        //closes the modal
            .then(this.toggle)
        }

        resetQuoteState = () => {
            this.setState({
                quoteText: "",
                quoteAuthor: ""
            })
        }

    render() {
       return (
        <>
                <section className="quoteSectionContent">
                    <Button
                        onClick={() => {
                            this.toggle()
                            this.refreshRandomQuote()
                        }}
                        circular
                        icon="quote left">
                    </Button>
                </section>
                <div>
                    <Modal
                        isOpen={this.state.modal}
                        toggle={this.toggle}
                        className={this.props.className}
                    >
                        <ModalHeader
                            className="modal__header"
                            toggle={this.toggle}
                            >get a quote
                            <Button
                                onClick={this.refreshRandomQuote}
                                circular
                                icon="quote left"
                            ></Button>
                        </ModalHeader>
                            <ModalBody>
                                <Input onChange={this.handleFieldChange}
                                        disabled
                                        type="textarea"
                                        id="quoteText"
                                        value={this.state.quoteText}
                                    /><br/>
                                <Input onChange={this.handleFieldChange}
                                        disabled
                                        type="text"
                                        id="quoteAuthor"
                                        value={this.state.quoteAuthor}
                                    /><br/>
                            </ModalBody>
                        <ModalFooter>
                            <Button
                                primary
                                onClick={ ()=> {
                                this.constructNewRandomQuote()
                                setTimeout(this.resetQuoteState, 1000)
                                }}>save</Button>
                            <Button
                                secondary
                                onClick={() => {
                                    this.toggle()
                                    this.resetQuoteState()
                                }}
                                >cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </>
        )
    }
}

export default AddRandomQuoteModal