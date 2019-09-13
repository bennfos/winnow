import React, { Component } from 'react'
import { Form, FormGroup, Input, option, Button} from 'reactstrap'
import BookDataManager from '../../Books/BookDataManager'

class PageDaySelect extends Component {
  state = {

  }

      constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
          dropdownOpen: false
        };
      }

      toggle() {
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
        }));
      }


      constructNewPage = event => {
        event.preventDefault();

    //Validates user input
        if (this.state.quoteText === ""||
        this.state.quoteAuthor === "") {
            alert("please fill out all fields");
        } else {
            this.setState({ loadingStatus: true });

        //creates a new object for the edited news item,
            const newQuote = {
                quoteText: this.state.quoteText,
                userId: parseInt(sessionStorage.getItem("credentials")),
                quoteAuthor: this.state.quoteAuthor,
                timestamp: new Date().toLocaleString()
            };

        //posts the object to the database, gets all news items, updates state of news array
            this.props.addQuote(newQuote)

        //closes the modal
            .then(this.toggle)
    }
};



        render() {
            return (
              <>
                <Form onSubmit={()=>console.log(test)}>
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
                  <Button type="submit">go</Button>
                </Form>
            </>
            );
          }

}

export default PageDaySelect