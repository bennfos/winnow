import React, { Component } from "react"
import { Link } from "react-router-dom"

import { Menu } from 'semantic-ui-react'
import "./Dashboard.css"
import ApplicationViews from "../ApplicationViews";

class Dashboard extends Component {


  logout = () => {
    sessionStorage.clear()
  }

  render() {

    return (
      <>
        <div className="appViews">
              <ApplicationViews />
          </div>
          <div className="nav__container">
            <Menu
                className="nav__menu"
                size="large"
                icon='labeled'
                borderless
                inverted
                fixed="bottom"
                fluid widths={4}
            >

                <Menu.Item
                  as={Link}
                  to='/quote'
                  className="sidebarButton"
                  icon="quote left"
                ></Menu.Item>

                <Menu.Item
                  as={Link}
                  to='/books'
                  className="sidebarButton"
                  icon="book"
                >
                </Menu.Item>

                <Menu.Item
                  as={Link}
                  to='/search'
                  className="sidebarButton"
                  icon="search"
                >
                </Menu.Item>


                <Menu.Item
                  as={Link}
                  to='/'
                  onClick={this.logout}
                  className="sidebarButton"
                  icon="log out">

                </Menu.Item>
            </Menu>




        </div>
      </>
    )
  }
}


export default Dashboard