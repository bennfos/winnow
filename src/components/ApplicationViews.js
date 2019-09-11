import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Auth from './Auth/Auth'
import BookMain from './Books/BookMain'
import RandomQuote from './Quotes/RandomQuote'
import PageMain from './Pages/PageMain'
import JanuarySelect from "./Pages/JanuarySelect";


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
          exact path="/books/:bookId(\d+)" render={props => {
            if (this.isAuthenticated()) {
              return <PageMain bookId={parseInt(props.match.params.bookId)} />
            }
              return <Auth {...props} />
          }}
        />

        <Route
          exact path="/quote" render={props => {
            if (this.isAuthenticated()) {
              return <RandomQuote {...props} />
            }
              return <Auth {...props} />
          }}
        />

        <Route
          exact path="/january" render={props => {
            if (this.isAuthenticated()) {
              return <JanuarySelect {...props} />
            }
              return <Auth {...props} />
          }}
        />

      </React.Fragment>
    );
  }
}
