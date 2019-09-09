import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Auth from './Auth/Auth'
import BookMain from './Books/BookMain'
import RandomQuote from './Quotes/RandomQuote'


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
          exact path="/book" render={props => {
            // Render FriendList component when user goes to '/friends'
            if (this.isAuthenticated()) {
              return <BookMain {...props} />
            }
              return <Auth {...props} />
          }}
        />

        <Route
          exact path="/quote" render={props => {
            // Render FriendList component when user goes to '/friends'
            if (this.isAuthenticated()) {
              return <RandomQuote {...props} />
            }
              return <Auth {...props} />
          }}
        />

      </React.Fragment>
    );
  }
}
