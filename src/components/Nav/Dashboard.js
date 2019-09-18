import React, { Component } from "react"
import { Link } from "react-router-dom"

import {Menu} from 'semantic-ui-react'
import "./Dashboard.css"
import ApplicationViews from "../ApplicationViews";

class Dashboard extends Component {
    

  logout = () => {
    sessionStorage.clear()
  }

  render() {

    return (
      <>
        <div >
              <ApplicationViews />
          </div>
          <div className="nav__container">
            <Menu
                className="nav__menu"
                as={Menu}
                icon='labeled'
                animation='push'
                inverted
                fixed="bottom"
                fitted="vertically"
                width='thin'
            >
                <Menu.Item as={Link} to='/books'
                className="sidebarButton"
                >books
                </Menu.Item>
                <Menu.Item as={Link} to='/search'
                className="sidebarButton"
                >
                search
                </Menu.Item>
                <Menu.Item as={Link} to='/quote'
                className="sidebarButton"
                >
                quote
                </Menu.Item>
                <Menu.Item as={Link} to='/'
                onClick={this.logout}
                className="sidebarButton">
                logout
                </Menu.Item>
            </Menu>




        </div>
      </>
    )
  }
}


export default Dashboard