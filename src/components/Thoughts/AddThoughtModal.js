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

    constructor(props) {
        super(props);
        this.state = {
            userId: parseInt(sessionStorage.getItem("credentials")),
            thought: "",
            pageId: 0,
            modal: false,
            loadingStatus: false
        };

        this.toggle = this.toggle.bind(this);
    }

//toggles modal
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

    constructOrEditThought = event => {
    //Validates user input
        if (this.state.thought === "") {
            alert("please provide the thought text");
        } else {

                const pageWithThought = {
                    id: this.props.pageId,
                    userId: parseInt(sessionStorage.getItem("credentials")),
                    bookId: this.props.bookId,
                    month: this.props.month,
                    day: this.props.day,
                    thought: this.state.thought
                }
                this.props.putThought(pageWithThought, this.props.pageId)
            }
        this.toggle()
    }

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

    componentDidUpdate(prevProps) {
        if (this.props.pageId !== prevProps.pageId) {
        //   this.props.renderThought(this.props.pageId)
          this.setState({
            thought: this.props.thought
          })
        }
      }


    resetThoughtInState = () => {
        this.setState({
            thought: ""
        })
    }

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
                                    this.resetThoughtInState()
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