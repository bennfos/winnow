import React, { Component } from 'react';
import PageMain from "./PageMain.js";




class Pages extends Component {

  render() {
    return (
      <React.Fragment>
        <PageMain {...this.props}/>
      </React.Fragment>
    )
  }
}

export default Pages;