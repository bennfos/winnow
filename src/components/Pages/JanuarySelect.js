import React, { Component } from 'react';
import PageDataManager from './PageDataManager'
import { Input, Label } from 'reactstrap';
import { Link } from 'react-router-dom'
import { Menu, Modal, Button } from 'semantic-ui-react';


class JanuarySelect extends Component {

//Defines initial state
    state = {
        pages: [],
        userId: parseInt(sessionStorage.getItem("credentials")),
        day: "1",
        month: "january",
        modalOpen: false,
        pageId: 0
    };


//Displays/hides the new article modal

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
        console.log(stateToChange)
    };

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })



    constructNewPage = event => {
        event.preventDefault();
    //Validates user input
        if (this.state.day === "") {
            alert("please select a day");
        } else {
            this.setState({ loadingStatus: true });

            PageDataManager.checkPages(this.props.bookId, this.state.month, this.state.day)
                .then(pages => {
                    console.log("bookId: ", this.props.bookId, "day: ", this.state.day)
                    if (pages.length > 0) {
                        this.setState({
                            pages: pages,
                            month: pages[0].month,
                            day: pages[0].day,
                            pageId: pages[0].id
                        })
                        console.log(this.state.pageId)
                        this.handleClose()
                        this.props.toggleSidebar()
                        this.props.history.push(`/books/${this.props.bookId}/${this.state.pageId}/${this.state.month}/${this.state.day}`)
                    } else {

                    //creates a new object for the edited news item,
                        const newPage = {
                            userId: parseInt(sessionStorage.getItem("credentials")),
                            bookId: this.props.bookId,
                            month: "january",
                            day: this.state.day,
                            thought: ""
                        };
                        //posts the object to the database, gets all news items, updates state of news array
                        PageDataManager.postPage(newPage)
                            .then(page => {
                                console.log("page: ", page)
                                this.setState({
                                    pageId: page.id
                                })
                                console.log("pageId: ", this.state.pageId)
                                this.props.history.push(`/books/${this.props.bookId}/${this.state.pageId}/${this.state.month}/${this.state.day}`)
                                this.handleClose()
                                this.props.toggleSidebar()

                            })
                    }
            })
        }
    }



    render(){
        return(
            <>
                <Modal
                    trigger={<Menu.Item
                        onClick={this.handleOpen}
                        >january</Menu.Item>}
                    open={this.state.modalOpen}
                    onClose={this.handleClose}
                >
                    <Modal.Header>select a page</Modal.Header>
                    <Modal.Content>
                        <Label />january
                        <Input
                        onChange={this.handleFieldChange}
                        type="select"
                        name="day"
                        id="day">
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
                    </Modal.Content>

                    <Modal.Actions>
                            <Button
                                onClick={
                                    this.constructNewPage
                                }>go
                            </Button>

                        <Button
                            onClick={
                                this.handleClose
                            }>cancel
                        </Button>
                    </Modal.Actions>
                </Modal>
            </>

        )
    }
}

export default JanuarySelect