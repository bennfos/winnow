import React, { Component } from 'react'
import { Card, CardText,
    CardTitle} from 'reactstrap'
import ConfirmDeleteThoughtModal from './ConfirmDeleteThoughtModal'
import '../Books/Card.css'

class ThoughtCard extends Component {
    state = {
        pages: [],
        pageId: 0,
    }

//updates state of thought in PageMain to trigger render when ThoughtCard is mounted
    componentDidMount() {
        this.props.renderThought(this.props.pageId)
        }



  render() {
    return (

        <div className="bookCard">
            <Card body>
                <div className="card__header">
                        <CardTitle
                            className="cardTitle">
                            <p>{this.props.thought}</p>
                        </CardTitle>
                    <ConfirmDeleteThoughtModal {...this.props}/>
                </div>
            </Card>
        </div>


    );
  }
}

export default ThoughtCard

