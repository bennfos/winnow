import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import EditBookModal from './EditBookModal'
import {Button, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Col, Row} from 'reactstrap'
import PageDataManager from '../Pages/PageDataManager'

class BookCard extends Component {
    state = {
        pages: [],
        pageId: 0
    }

  //Renders an individual news card with an article title, synopsis, link to URL, and edit and delete buttons.



  constructOrNavigateToFirstPage = event => {
    event.preventDefault();
//Validates user input
        PageDataManager.checkPages(this.props.book.id, "january", "1")
            .then(pages => {
                if (pages.length > 0) {
                    this.setState({
                        pages: pages,
                        pageId: pages[0].id
                    })
                    this.props.history.push(`/books/${this.props.book.id}/${this.state.pageId}`)
                } else {

                //creates a new object for the edited news item,
                    const newPage = {
                        userId: parseInt(sessionStorage.getItem("credentials")),
                        bookId: this.props.book.id,
                        month: "january",
                        day: "1",
                        thought: ""
                    };
                    //posts the object to the database, gets all news items, updates state of news array
                    PageDataManager.postPage(newPage)
                        .then(page => {
                            this.setState({
                                pageId: page.id
                            })
                            console.log("pageId: ", this.state.pageId)
                        })
                        .then(this.props.history.push(`/books/${this.props.book.id}/${this.state.pageId}`))
                }
            })
    }



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
                            onClick={this.constructOrNavigateToFirstPage}
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
