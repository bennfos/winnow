import React, { Component } from 'react';
import { Input, Label, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Menu, Button } from 'semantic-ui-react';


class DecemberSelect extends Component {

//Defines initial state
    state = {
        pages: [],
        userId: parseInt(sessionStorage.getItem("credentials")),
        day: "",
        month: "",
        modal: false,
        pageId: 0
    };

    constructor(props) {
        super(props);
        this.state = {
            day: "",
            month: "",
            quotes: [],
            userId: parseInt(sessionStorage.getItem("credentials")),
            quoteText: "",
            quoteAuthor: "",
            timestamp: "",
            modal: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }



    render(){
        return(
            <>
                <Menu.Item
                        onClick={() => {
                            this.toggle()
                            this.props.setMonth("december")
                        }}
                        >december
                </Menu.Item>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>select a page</ModalHeader>
                    <ModalBody>
                        <Label />december
                        <Input
                        onChange={this.props.handleFieldChange}
                        type="select"
                        name="day"
                        id="day"
                        placeholder="select a day">
                                <option>select a day</option>
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
                    </ModalBody>

                    <ModalFooter>
                            <Button
                                onClick={() => {
                                    this.props.constructNewPage()
                                    this.toggle()
                                }

                                }>go
                            </Button>

                        <Button
                            onClick={
                                this.toggle
                            }>cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </>

        )
    }
}

export default DecemberSelect