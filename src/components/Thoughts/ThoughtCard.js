import React, { Component } from 'react'
import { Card, CardText,
    CardTitle} from 'reactstrap'
import ConfirmDeleteThoughtModal from './ConfirmDeleteThoughtModal'
import '../Books/Card.css'
import './Thoughts.css'

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

        <div>
            <Card body className="thoughtCard">
                <div className="card__content">
                        <CardTitle
                            className="card__thought">
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

