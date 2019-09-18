import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap';
import { Icon, Button } from 'semantic-ui-react'
import PageDataManager from '../Pages/PageDataManager'

class AddThoughtModal extends Component {

    state = {
        userId: parseInt(sessionStorage.getItem("credentials")),
        thought: "add your thoughts",
        pageId: 0,
        modal: false,
        loadingStatus: false
    };


//toggles modal
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

    constructOrEditThought = event => {
    //Validates user input
        if (this.state.thought === "") {
            alert("please provide the thought text");
        } else {
            //construct a page object that includes the new or edited thought
                const pageWithThought = {
                    id: this.props.pageId,
                    userId: parseInt(sessionStorage.getItem("credentials")),
                    bookId: this.props.bookId,
                    month: this.props.month,
                    day: this.props.day,
                    thought: this.state.thought
                }
            //put the page object with new or edited thought in the database
                this.props.putThought(pageWithThought, this.props.pageId)
            }
        this.toggle()
    }

    //gets thought for that page into state so that it can be displayed in input field for user
    componentDidMount() {
        PageDataManager.getPage(this.props.pageId)
        .then(page => {
            this.setState({
            thought: page.thought,
            loadingStatus: false,
            });
            console.log(this.state)
        });
    }

//When component receives new pageId in props (i.e., page is changed) from PageMain, update state in PageMain to cause an update of state in this modal. Ensures correct value will populate in input field after page change.
    componentDidUpdate(prevProps) {
        if (this.props.pageId !== prevProps.pageId) {
          this.props.renderThought(this.props.pageId)
          this.setState({
            thought: this.props.thought
          })
        }
      }

//clears state of thought so that nothing will display if there is no thought in props. Ensures input field will be empty if opening modal from page with no thought yet added.
    resetThoughtInStateIfNoThoughtInProps = () => {
        if (this.props.thought === "") {
            this.setState({
                thought: ""
            })
        }
    }


    render(){
        return(
            <>
                <section onClick={()=> {
                    this.toggle()
                    this.resetThoughtInStateIfNoThoughtInProps()
                }} className="thoughtList__header">
                    <div className="thoughtList__title">
                        <Label>thoughts</Label>
                        <Icon

                            name="chevron right"
                            size="small">
                        </Icon>
                    </div>
                </section>
                <div>
                    <Modal
                        isOpen={this.state.modal}
                        toggle={this.toggle}
                    >
                        <ModalHeader toggle={this.toggle}>thought</ModalHeader>
                        <ModalBody>
                            <Input onChange={this.handleFieldChange}
                                    type="textarea"
                                    id="thought"
                                    placeholder="add thought"
                                    required
                                    autoFocus=""
                                    value={this.state.thought}
                            ></Input>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                primary
                                onClick={ () => {
                                    this.constructOrEditThought()
                                }
                                }>save</Button>
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

export default AddThoughtModal