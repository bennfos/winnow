import React, { Component } from 'react'
import PageList from './PageList'
import PageDay from './PageDay'
import PageSelect from './PageSelect'
import { Sidebar, Menu, Icon, Segment, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class PageMain extends Component {

    state = {
        visible: false,
    }

    handleClick = (event) => {
        if (this.state.visible === false) {
          this.setState({ visible: true })
        } else {
          this.setState({ visible: false })
        }
      }

    render() {
        const { visible } = this.state
        return (
<>
            <Button onClick={this.handleClick}>V</Button>
        <Sidebar.Pushable >
          <Sidebar
            className="dimmed"
            as={Menu}
            color="blue"
            animation='overlay'
            icon='labeled'
            inverted
            onHide={this.handleSidebarHide}
            horizontal
            direction='top'
            visible={visible}
            width='thin'
          >
            <Menu.Item onClick={this.handleClick}
            name='window close outline'>
                        <Icon
                        name="window close outline"
                        color="grey"
                        size='tiny'/>
                    </Menu.Item>
            <Menu.Item as={Link} to='/january'
              onClick={this.handleClick} className="sidebarButton"
            >january
            </Menu.Item>
            <Menu.Item as={Link} to='/february/'
              className="sidebarButton"
              onClick={this.handleClick}>
              february
            </Menu.Item>
            <Menu.Item as={Link} to='/march'
              className="sidebarButton"
              onClick={this.handleClick}>
              march
            </Menu.Item>
            <Menu.Item as={Link} to='/april'
              onClick={this.logout}
              className="sidebarButton">
              april
            </Menu.Item>
            <Menu.Item as={Link} to='/may'
              onClick={this.logout}
              className="sidebarButton">
              may
            </Menu.Item>
            <Menu.Item as={Link} to='/june'
              onClick={this.logout}
              className="sidebarButton">
              june
            </Menu.Item>
            <Menu.Item as={Link} to='/july'
              onClick={this.logout}
              className="sidebarButton">
              july
            </Menu.Item>
            <Menu.Item as={Link} to='/august'
              onClick={this.logout}
              className="sidebarButton">
              august
            </Menu.Item>
            <Menu.Item as={Link} to='/september'
              onClick={this.logout}
              className="sidebarButton">
              september
            </Menu.Item>
            <Menu.Item as={Link} to='/november'
              onClick={this.logout}
              className="sidebarButton">
              november
            </Menu.Item>
            <Menu.Item as={Link} to='/december'
              onClick={this.logout}
              className="sidebarButton">
              december
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher dimmed={visible}>
            <PageList {...this.props}/>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
        </>
        )
    }
}


export default PageMain