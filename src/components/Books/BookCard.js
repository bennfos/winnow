import React, { Component } from 'react'
// import EditBookModal from './EditBookModal'
import {Button} from 'reactstrap'

class BookCard extends Component {

  //Renders an individual news card with an article title, synopsis, link to URL, and edit and delete buttons.

  render() {
    return (

        <div className="bookCard">
          <h3>{this.props.book.title}</h3>
          <p>{this.props.book.description}</p>
          {/* <EditBookModal
          {...this.props}
          postedEditedNewsItem={this.props.postedEditedNewsItem}
          /> */}
          <Button color="danger" type="button" onClick={() => this.props.removeBook(this.props.book.id)}>Delete</Button>
        </div>

    );
  }
}

export default BookCard
