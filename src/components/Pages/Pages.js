import React, { Component } from 'react';
import PageMain from "./PageMain.js";




class Pages extends Component {

  componentDidMount () {
    document.body.classList.add('bk2')
  }

  componentWillUnmount () {
    document.body.classList.remove('bk2')
  }

  render() {
    return (
      <React.Fragment>
        <PageMain {...this.props}/>
      </React.Fragment>
    )
  }
}

export default Pages;