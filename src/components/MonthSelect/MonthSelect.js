import React, { Component } from 'react';
import { Label, Modal, ModalHeader, ModalBody, ModalFooter, Input} from 'reactstrap';
import { Menu, Button, Grid, Container, Segment, Card,  } from 'semantic-ui-react';
import '../Books/Card.css'



class MonthSelect extends Component {

//Defines initial state
    state = {
        modal: false,
        day: 0,
        days: []
    };

    pushDaysOfMonth = () => {
        console.log(this.props.monthSelect)
        let daysOfMonth = []
        for (let i = 1; i <= 31; i++) {
            daysOfMonth.push(i)
        }
        if (this.props.monthSelect === "february") {
                daysOfMonth.pop()
                daysOfMonth.pop()
        } else if (this.props.monthSelect === "september") {
            daysOfMonth.pop()
        } else if (this.props.monthSelect === "april") {
            daysOfMonth.pop()
        } else if (this.props.monthSelect === "june") {
            daysOfMonth.pop()
        } else if (this.props.monthSelect === "november") {
            daysOfMonth.pop()
        }
        this.setState({
            days: daysOfMonth
        })
    }

    // pushDaysOfMonth = () => {
    //     console.log(this.props.monthSelect)
    //     let daysOfMonth = []
    //     for (let i = 1; i <= 31; i++) {
    //         daysOfMonth.push(i)
    //     }
    //     if (this.props.monthSelect === "february") {
    //             daysOfMonth.pop()
    //             daysOfMonth.pop()
    //     } else if (this.props.monthSelect === "september" || "april" || "june" || "november") {
    //         daysOfMonth.pop()
    //     this.setState({
    //         days: daysOfMonth
    //     })
    // }





    //toggles modal
    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    render(){
        const monthSelect = this.props.monthSelect
        return(
            <>
                <Menu.Item
                        onClick={() => {
                            this.props.setMonth(monthSelect)
                            this.pushDaysOfMonth()
                            this.toggle()
                        }}
                        >{monthSelect}
                </Menu.Item>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>select page</ModalHeader>
                    <ModalBody className="card__body">
                        <Container className="calendar__container">
                            <Grid columns={7}>
                                <Grid.Row centered>
                                    <Label />{monthSelect}
                                </Grid.Row>
                                <Grid.Row>
                                    {this.state.days.map(day => {
                                        return (
                                            <Grid.Column key={day} >
                                                <Input
                                                    id="day"
                                                    type="button"
                                                    value={day.toString()}
                                                    className="dayInt__button"
                                                    onClick={this.props.handleFieldChange}
                                                >
                                                </Input>
                                            </Grid.Column>
                                        )
                                    })}
                                </Grid.Row>
                            </Grid>
                        </Container>
                    </ModalBody>
                    <ModalFooter>
                            <Button
                                primary
                                onClick={() => {
                                    this.props.constructOrNavigateToNewPage()
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

export default MonthSelect