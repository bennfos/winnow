import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import QuoteCard from './Quotes/QuoteCard'


export default class ApplicationViews extends Component {
  isAuthenticated = () => sessionStorage.getItem("credentials") !== null;
  activeUser = () => parseInt(sessionStorage.getItem("credentials"))


  render() {
    return (
      <React.Fragment>

        <Route exact path="/" render={(props) => {
          return <QuoteCard {...props} />
        }} />


      </React.Fragment>
    );
  }
}
