import React, { Component } from 'react'
import EditThoughtModal from './EditThoughtModal'
import { Card, CardText,
    CardTitle} from 'reactstrap'
import ConfirmDeleteThoughtModal from './ConfirmDeleteThoughtModal'
import '../Books/Card.css'

class ThoughtCard extends Component {
    state = {
        pages: [],
        pageId: 0,
    }

    componentDidMount() {
        this.props.renderThought(this.props.pageId)
        }



  render() {
    return (

        <div className="bookCard">


                    <Card body>
                        <div className="card__content">
                            <div className="card__header">
                                <CardTitle
                                    className="cardTitle">
                                    <p>{this.props.thought}</p>
                                </CardTitle>
                                <div className="editAndDelete__container">
                                    <ConfirmDeleteThoughtModal {...this.props}/>
                                    {/* <EditThoughtModal
                                        {...this.props}
                                        postEditedThought={this.props.postEditedThought}
                                    /> */}


                                </div>
                            </div>
                            {/* <CardText>{this.props.thought}</CardText> */}
                        </div>

                    </Card>
        </div>

    );
  }
}

export default ThoughtCard




{/* <AddThoughtsModal {...this.props}/> */}
{/* <EditThoughtsModal {...this.props}/> */}