import React, { Component } from "react"
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import {Menu, Icon, Segment, Sidebar, Button} from 'semantic-ui-react'
import "./Dashboard.css"
import ApplicationViews from "../ApplicationViews";

class Dashboard extends Component {
    state = { visible: false }
  handleClick = (event) => {
    if (this.state.visible === false) {
      this.setState({ visible: true })
    } else {
      this.setState({ visible: false })
    }
  }


  logout = () => {
    sessionStorage.clear()
  }

  render() {

    return (
      <>
        <div className="appViews__container">
              <ApplicationViews />
          </div>
          <div className="nav__container">
            <Menu
                className="nav__menu"
                as={Menu}
                icon='labeled'
                animation='push'
                inverted
                direction='bottom'
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
                onClick={this.handleClick}>
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

//     render() {
//         return (
//             <nav className="navbar navbar-light light-blue flex-md-nowrap p-0 shadow">
//                 <ul className="nav nav-pills nav-fill">
//                     <li className="nav-item">
//                         <Link className="nav-link" to="/books">Books</Link>
//                     </li>
//                     <li className="nav-item">
//                         <Link className="nav-link" to="/search">Search</Link>
//                     </li>
//                     <li className="nav-item">
//                         <Link onClick={this.logout} className="nav-link" to="/">Logout</Link>
//                     </li>
//                     <li className="nav-item">
//                         <Link className="nav-link" to="/quote">Quote</Link>
//                     </li>
//                 </ul>
//             </nav>
//         )
//     }
// }

export default Dashboard