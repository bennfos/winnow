import React, { Component } from 'react';
import './Winnow.css';
import NavBar from './Nav/NavBar'
import ApplicationViews from "./ApplicationViews";




class Winnow extends Component {

  render() {
    return (
      <React.Fragment>
        <NavBar {...this.props}/>
        <ApplicationViews />
      </React.Fragment>
    )
  }
}

export default Winnow;
