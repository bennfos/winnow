import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input } from 'reactstrap';

class AddPageModal extends Component {

//Defines initial state
    state = {
        pages: [],
        userId: parseInt(sessionStorage.getItem("credentials")),
        month: "january",
        day: "1"
    };

    constructor(props) {
        super(props);
        this.state = {
            pages: [],
            userId: parseInt(sessionStorage.getItem("credentials")),
            month: "",
            day: "",
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
        console.log(this.state)
    };

    constructNewPage = event => {
        event.preventDefault();

    //Validates user input
        if (this.state.month === ""||
        this.state.day === "") {
            alert("please select month and day");
        } else {
            this.setState({ loadingStatus: true });

        //creates a new object for the edited news item,
            const newPage = {
                month: this.state.month,
                userId: parseInt(sessionStorage.getItem("credentials")),
                day: this.state.day,
            };

        //posts the object to the database, gets all news items, updates state of news array
            this.props.addPage(newPage)

        //closes the modal
            .then(this.toggle)
    }
};

    render(){
        return(
            <>
                <section className="pageSectionContent">
                    <Button type="button"
                    color="success"
                    onClick={this.toggle}>
                    add page
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
                                <Input onChange={this.handleFieldChange} type="select" name="month" id="month">
                                <option disabled selected>month</option>
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
                                <Input onChange={this.handleFieldChange} type="select" name="day" id="day" >
                                <option disabled selected>day</option>
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

export default AddPageModal