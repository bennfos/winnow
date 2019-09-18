import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Icon, Button} from 'semantic-ui-react'

class ConfirmDeleteThoughtModal extends Component {

//Defines initial state
    constructor(props) {
        super(props);
        this.state = {
            quotes: [],
            userId: "",
            quoteAuthor: "",
            quoteText: "",
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

//edits page so that thought is removed, and puts edited page in database (see PageMain)
    removeThought = event => {
        event.preventDefault()
            const pageWithThought = {
                id: this.props.pageId,
                userId: parseInt(sessionStorage.getItem("credentials")),
                bookId: this.props.bookId,
                month: this.props.month,
                day: this.props.day,
                thought: ""
            }
            this.props.putThought(pageWithThought, this.props.pageId)
            this.toggle()
        }



    render(){
        return(
            <>
                <section className="confirmSectionContent">
                    <Icon
                        className="delete__icon"
                        name="delete"
                        onClick={this.toggle}
                        size="small"
                    >
                    </Icon>
                </section>
                <div>
                    <Modal
                        isOpen={this.state.modal}
                        toggle={this.toggle}
                    >
                        <ModalHeader toggle={this.toggle}>confirm delete</ModalHeader>
                        <ModalBody>
                            <div className="confirm__message">
                                <h4>are you sure you want to delete this thought?</h4>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                negative
                                onClick={
                                    this.removeThought
                                }>delete</Button>
                            <Button

                                onClick={this.toggle}
                            >cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </>
        )
    }

}
export default ConfirmDeleteThoughtModal