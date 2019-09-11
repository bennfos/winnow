import React, { Component } from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';

class JanuarySelect extends Component {

//Defines initial state
    state = {
        pages: [],
        userId: parseInt(sessionStorage.getItem("credentials")),
        day: ""
    };

    constructor(props) {
        super(props);
        this.state = {
            pages: [],
            userId: parseInt(sessionStorage.getItem("credentials")),
            day: "1",
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
        if (this.state.day === "") {
            alert("please select a day");
        } else {
            this.setState({ loadingStatus: true });

        //creates a new object for the edited news item,
            const newPage = {
                month: "january",
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
                <Form>
                  <FormGroup>
                    <Input onChange={this.handleFieldChange} type="select" name="day" id="dayInput">
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
                  <Button type="button" onClick={this.constructNewPage}>go</Button>
                </Form>
            </>
        )
    }
}

export default JanuarySelect