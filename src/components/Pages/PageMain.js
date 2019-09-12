import React, { Component } from 'react'
import PageList from './PageList'
import PageDay from './PageDay'
import PageSelect from './PageSelect'
import { Sidebar, Menu, Icon, Segment, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import './PageMain.css'
import JanuarySelect from './JanuarySelect';
import PageDataManager from './PageDataManager'
import RandomQuote from '../Quotes/RandomQuote'

class PageMain extends Component {

    state = {
        visible: false,
        day: "",
        month: "",
        dayChosen: false
    }

    handleClick = (event) => {
        if (this.state.visible === false) {
          this.setState({ visible: true })
        } else {
          this.setState({ visible: false })
        }
      }

      changeView = (event) => {
        if (this.state.dayChosen === false) {
          this.setState({ dayChosen: true })
        } else {
          this.setState({ dayChosen: false })
        }
      }


    addPage = pageObject => {
        return PageDataManager.postPage(pageObject)
            .then(() => {
                PageDataManager.getAllPages(this.state.userId)
                    .then(pages => {
                        this.setState({
                            pages: pages
                        });
                    });
            });
    };

    render() {
        const { visible } = this.state
        return (
        <>
            <div className="pageSelect">
                <Button icon="caret down" className="pageSelect__button" onClick={this.handleClick}></Button>

            <Sidebar.Pushable >
                <div className="sidebar">
            <Sidebar
                className="dimmed"
                as={Menu}
                color="grey"
                animation='overlay'
                icon='labeled'
                inverted
                onHide={this.handleSidebarHide}
                horizontal="true"
                direction='top'
                visible={visible}
                width='thin'
            >

                    ><JanuarySelect
                        addPage={this.addPage}
                        toggleSidebar={this.handleClick}
                        changeView={this.changeView}
                        {...this.props}/>



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
            </div>
            <Sidebar.Pusher dimmed={visible}>
                {this.state.hasChosenDay ? (
                    <PageDay {...this.props} />
                    )
                      : (
                    <RandomQuote {...this.props} />
                      )
                }
            </Sidebar.Pusher>
            </Sidebar.Pushable>
            </div>
        </>
        )
    }
}


export default PageMain