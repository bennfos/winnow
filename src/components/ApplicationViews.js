import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Auth from './Auth/Auth'
import BookMain from './Books/BookMain'
import RandomQuote from './Quotes/RandomQuote'
import Pages from './Pages/Pages'
import Search from './Search/Search'
import SearchResults from './Search/SearchResultCard'


export default class ApplicationViews extends Component {
  isAuthenticated = () => sessionStorage.getItem("credentials") !== null;
  activeUser = () => parseInt(sessionStorage.getItem("credentials"))


  render() {
    return (
      <React.Fragment>

        <Route
          exact path="/"
          render={props => {
            return <Auth {...props} />;
          }}
        />

        <Route
          exact path="/books" render={props => {
            if (this.isAuthenticated()) {
              return <BookMain {...props} />
            }
              return <Auth {...props} />
          }}
        />

        <Route
           path="/books/:bookId(\d+)" render={props => {
            if (this.isAuthenticated()) {
              return <Pages
                  bookId={parseInt(props.match.params.bookId)}
                  {...props}/>
            }
              return <Auth {...props} />
          }}
        />

        <Route
          exact path="/quote" render={props => {
            if (this.isAuthenticated()) {
              return <RandomQuote {...props} />
            }
              return <Auth {...this.props} />
          }}
        />

        <Route
          exact path="/search" render={props => {
            if (this.isAuthenticated()) {
              return <Search {...props} />
            }
              return <Auth {...this.props} />
          }}
        />

      </React.Fragment>
    );
  }
}
