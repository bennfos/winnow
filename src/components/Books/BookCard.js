import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import EditBookModal from './EditBookModal'
import {Button, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Col, Row} from 'reactstrap'

class BookCard extends Component {

  //Renders an individual news card with an article title, synopsis, link to URL, and edit and delete buttons.

  render() {
    return (

        <div className="bookCard">
            <Row>
                <Col sm="6">
                    <Card body onClick={() => console.log("clicked")}>
                        <CardTitle>{this.props.book.title}</CardTitle>
                        <CardText>{this.props.book.description}</CardText>
                        <EditBookModal
                        {...this.props}
                        postedEditedNewsItem={this.props.postedEditedNewsItem}
                        />
                        <Button
                            onClick={() => this.props.history.push(`./books/${this.props.book.id}/landing`)}
                            >open</Button>
                        <Button color="danger" onClick={() => this.props.removeBook(this.props.book.id)}>delete</Button>

                    </Card>
                </Col>
            </Row>
        </div>

    );
  }
}

export default BookCard
