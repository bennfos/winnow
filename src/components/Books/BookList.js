import React, { Component } from "react";
import BookCard from "./BookCard";
import BookDataManager from "./BookDataManager";
import AddBookModal from "./AddBookModal";
import './BookList.css'


class BookList extends Component {
  //Defines initial state
  state = {
    books: [],
    userId: parseInt(sessionStorage.getItem("credentials"))
  };

  //When component mounts, gets all news and sets state of news array with all existsing news items
  componentDidMount() {
    BookDataManager.getAllBooks(this.state.userId).then(books => {
        this.setState({
          books: books
        });
      });
    };

  // Called in NewsItemNewModal (child component) to post a new object to database and update state
  addBook = bookObject => {
    return BookDataManager.postBook(bookObject)
        .then(() => {
            BookDataManager.getAllBooks(this.state.userId)
                .then(books => {
                    this.setState({
                        books: books
          });
        });
      });
    };


  // Called in NewsCard(child component) to delete object from database and update state
  removeBook = id => {
    BookDataManager.deleteBook(id)
        .then(() => {
            BookDataManager.getAllBooks(this.state.userId)
                .then(books => {
          this.setState({
            books: books
          });
        });
      });
  };

  // Called in NewEditModal (child component) to post edited object to database and update state
  postEditedBook = id => {
    return BookDataManager.editBook(id).then(() => {
      BookDataManager.getAllBooks(this.state.userId)
        .then(books => {
          this.setState({
            books: books
          });
        });
      });
  };

  render() {
    return (
      <React.Fragment>
        <div className="bookList__header">
          <h1>my books</h1>
          <div className="addBookModal">
            <AddBookModal  {...this.props} addBook={this.addBook} />
          </div>
        </div>
        <div className="bookCards__container">
          {this.state.books.map(book => (
            <BookCard
              key={book.id}
              book={book}
              removeBook={this.removeBook}
              postEditedBook={this.postEditedBook}
              {...this.props}
            />
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default BookList;
