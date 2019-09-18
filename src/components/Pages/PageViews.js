import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import PageDay from './PageDay'
import Auth from '../Auth/Auth'


export default class PageViews extends Component {
  isAuthenticated = () => sessionStorage.getItem("credentials") !== null;


  render() {
    return (
      <React.Fragment>

        <Route
          exact path="/books/:bookId(\d+)/:pageId(\d+)/:month/:day" render={props => {
            if (this.isAuthenticated()) {
              return <PageDay
                        pageId={props.match.params.pageId}
                        bookId={props.match.params.bookId}
                        month={props.match.params.month}
                        day={props.match.params.day}
                        {...this.props}
                      />
            }
              return <Auth {...props} />
          }}
        />


      </React.Fragment>
    );
  }
}
