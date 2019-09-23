import React, { Component } from 'react'
import EditBookModal from './EditBookModal'
import { Card, CardText, CardTitle } from 'reactstrap'
import { Icon } from 'semantic-ui-react'
import PageDataManager from '../Pages/PageDataManager'
import ConfirmBookDeleteModal from './ConfirmDeleteBookModal'
import './Card.css'

class BookCard extends Component {
    state = {
        pages: [],
        pageId: 0,
        description: "",
        display: "hide"
    }

  //Renders an individual news card with an article title, synopsis, link to URL, and edit and delete buttons.



  constructOrNavigateToFirstPage = event => {
    event.preventDefault();
//Validates user input
        PageDataManager.checkPages(this.props.book.id, this.props.currentMonth, this.props.currentDate)
            .then(pages => {
                if (pages.length > 0) {
                    this.setState({
                        pages: pages,
                        pageId: pages[0].id
                    })
                    this.props.history.push(`/books/${this.props.book.id}/${this.state.pageId}/${this.props.currentMonth}/${this.props.currentDate}`)
                } else {

                //creates a new object for the edited news item,
                    const newPage = {
                        userId: parseInt(sessionStorage.getItem("credentials")),
                        bookId: this.props.book.id,
                        month: this.props.currentMonth,
                        day: this.props.currentDate,
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
                            this.props.history.push(`/books/${this.props.book.id}/${this.state.pageId}/${this.props.currentMonth}/${this.props.currentDate}`)
                        })
                }
            })
    }

    toggleEditAndDelete = () => {
        if (this.state.display === "hide") {
          this.setState({
              display: "show"
          })
      } else if (this.state.display === "show") {
          this.setState({
              display: "hide"
          })
      }
    }

  render() {
    return (


            <div className="bookCard" onClick={() => this.toggleEditAndDelete()}>
                <div className="card__content">
                    <div className={this.state.display}>
                            <ConfirmBookDeleteModal {...this.props}/>
                            <EditBookModal
                                {...this.props}
                                postEditedBook={this.props.postEditedBook}
                            />
                        </div>
                        <div className="card__title"
                            onClick={this.constructOrNavigateToFirstPage}
                        >
                            <h4>{this.props.book.title}</h4>
                            <div className="open__button">
                                <Icon
                                    name="chevron right"

                                ></Icon>
                            </div>
                        </div>
                    <p><em>{this.props.book.description}</em></p>
                </div>
            </div>


    );
  }
}

export default BookCard
