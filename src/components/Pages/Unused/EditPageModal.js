import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input } from 'reactstrap';
import PageDataManager from '../PageDataManager'

class PageEditModal extends Component {

//Defines initial state
    state = {
        pages: [],
        month: "",
        day: "",
        loadingStatus: false,
    };

    constructor(props) {
        super(props);
        this.state = {
            pages: [],
            month: "",
            day: "",
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


    editExistingPage = (event) => {
        event.preventDefault();

    //Validates user input
        if (this.state.month === ""||
        this.state.day === "") {
            alert("Please choose a month and day");
        } else {
            this.setState({ loadingStatus: true });

        //creates a new object for the edited news item,
            const editedPage = {
                id: this.props.book.id,
                userId: parseInt(sessionStorage.getItem("credentials")),
                month: this.state.month,
                day: this.state.day,
            };
        //posts the object to the database
            this.props.postEditedPage(editedPage)
        //closes the modal
            .then(this.toggle)
        }
    }


//Gets the id of the news item that is being edited and sets state to populate the input fields
    componentDidMount() {
        PageDataManager.getPage(this.props.page.id)
        .then(page => {
            this.setState({
            month: page.month,
            day: page.day,
            loadingStatus: false,
            });
        });
    }

    render(){
        return(
            <>
                <section className="bookSectionContent">
                <Button type="button"
                onClick={this.toggle}>
                edit
                </Button>
                </section>
                <div>
                <Modal
                        isOpen={this.state.modal}
                        toggle={this.toggle}
                        className={this.props.className}
                    >
                        <ModalHeader toggle={this.toggle}>add page</ModalHeader>
                        <ModalBody>
                        <Form>
                            <FormGroup>
                                <Input type="select" name="month" id="monthInput">
                                  <option>january</option>
                                  <option>february</option>
                                  <option>march</option>
                                  <option>april</option>
                                  <option>may</option>
                                  <option>june</option>
                                  <option>july</option>
                                  <option>august</option>
                                  <option>september</option>
                                  <option>october</option>
                                  <option>november</option>
                                  <option>december</option>
                                </Input>
                                <Input type="select" name="day" id="dayInput">
                                  <option>1</option>
                                  <option>2</option>
                                  <option>3</option>
                                  <option>4</option>
                                  <option>5</option>
                                  <option>6</option>
                                  <option>7</option>
                                  <option>8</option>
                                  <option>9</option>
                                  <option>10</option>
                                  <option>11</option>
                                  <option>12</option>
                                  <option>13</option>
                                  <option>14</option>
                                  <option>15</option>
                                  <option>16</option>
                                  <option>17</option>
                                  <option>18</option>
                                  <option>19</option>
                                  <option>20</option>
                                  <option>21</option>
                                  <option>22</option>
                                  <option>23</option>
                                  <option>24</option>
                                  <option>25</option>
                                  <option>26</option>
                                  <option>27</option>
                                  <option>28</option>
                                  <option>29</option>
                                  <option>30</option>
                                  <option>31</option>
                                </Input>
                              </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.constructNewPage}>save</Button>{' '}
                            <Button color="secondary" onClick={this.toggle}>cancel</Button>
                        </ModalFooter>
                    </Modal>
        </div>
        </>
        )
    }
}

export default PageEditModal