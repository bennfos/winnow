import React, { Component } from "react";
import BookCard from "./BookCard";
import BookDataManager from "./BookDataManager";
import AddBookModal from "./AddBookModal";
import './BookList.css'


class BookList extends Component {
  //Defines initial state
  state = {
    books: [],
    description: "",
    userId: parseInt(sessionStorage.getItem("credentials"))
  };

  //When component mounts, get all user's books and set state of with all existsing books
  componentDidMount() {
    BookDataManager.getAllBooks(this.state.userId).then(books => {
        this.setState({
          books: books
        });
      });
    };

  // post a new book object to database and update state (called in AddBookModal)
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


  // delete book object from database and update state (called in ConfirmDeleteBookModal)
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

  // post edited object to database and update state
  putEditedBook = id => {
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
            <AddBookModal
              {...this.props}
              addBook={this.addBook}
            />
          </div>
        </div>
        <div className="bookCards__container">
          {this.state.books.map(book => (
            <BookCard
              key={book.id}
              book={book}
              removeBook={this.removeBook}
              putEditedBook={this.putEditedBook}
              {...this.props}
            />
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default BookList;
