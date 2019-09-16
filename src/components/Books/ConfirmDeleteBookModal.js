import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Icon } from 'semantic-ui-react'

class ConfirmDeleteBookModal extends Component {

//Defines initial state
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


    render(){
        return(
            <>
                <section className="eventSectionContent">
                    <Icon
                        className="delete__icon"
                        name="delete"
                        onClick={this.toggle}
                        size='med'>
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
                                <h4>are you sure you want to delete this book?</h4>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color="danger"
                                onClick={()=>{
                                    this.props.removeBook(this.props.book.id)
                                    this.toggle()
                                }}>delete</Button>
                            <Button
                                color="secondary"
                                onClick={this.toggle}
                            >cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </>
        )
    }
}

export default ConfirmDeleteBookModal