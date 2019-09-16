import React, { Component } from 'react'
import EditBookModal from './EditBookModal'
import { Card, CardText,
    CardTitle, Col, Row, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import { Icon, Confirm } from 'semantic-ui-react'
import PageDataManager from '../Pages/PageDataManager'
import ConfirmBookDeleteModal from './ConfirmDeleteBookModal'
import './Card.css'

class BookCard extends Component {
    state = {
        pages: [],
        pageId: 0,
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
                    this.props.history.push(`/books/${this.props.book.id}/${this.state.pageId}/january/1`)
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
                            console.log("Page:", page)
                            this.setState({
                                pageId: page.id
                            })
                            console.log("pageId: ", this.state.pageId)
                            this.props.history.push(`/books/${this.props.book.id}/${this.state.pageId}/january/1`)
                        })
                }
            })
    }



  render() {
    return (

        <div className="bookCard">

            <Row>
                <Col sm="6">
                    <Card body onClick={() => console.log("clicked")}>
                        <div className="card__content">
                            <div className="card__header">
                                <CardTitle
                                    onClick={this.constructOrNavigateToFirstPage}
                                    className="cardTitle">
                                    <h2>{this.props.book.title}</h2>
                                    <div className="open__button">
                                        <Icon
                                            name="chevron right"
                                            size="large"
                                        ></Icon>
                                    </div>
                                </CardTitle>
                                <div className="editAndDelete__container">
                                    <ConfirmBookDeleteModal {...this.props}/>
                                    <EditBookModal
                                        {...this.props}
                                        postEditedBook={this.props.postEditedBook}
                                    />


                                </div>
                            </div>
                            <CardText>{this.props.book.description}</CardText>
                        </div>

                    </Card>
                </Col>
            </Row>
        </div>

    );
  }
}

export default BookCard
