import React, { Component } from 'react';
import './Winnow.css';
import Dashboard from './Nav/Dashboard'
import ApplicationViews from "./ApplicationViews";




class Winnow extends Component {

  render() {
    return (
      <React.Fragment>
        <Dashboard {...this.props}/>
      </React.Fragment>
    )
  }
}

export default Winnow;
