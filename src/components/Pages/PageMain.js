import React, { Component } from 'react'
import PageList from './Unused/PageList'
import PageDay from './PageDay'
import PageSelect from './Unused/PageSelect'
import { Sidebar, Menu, Icon, Segment, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import './PageMain.css'
import JanuarySelect from './JanuarySelect';
import PageDataManager from './PageDataManager'
import RandomQuote from '../Quotes/RandomQuote'
import PageViews from './PageViews'

class PageMain extends Component {

    state = {
        visible: false,
        day: "",
        month: "",
        dayChosen: false,
        modal: false,
        pageId: 0,
        pages: [],
        quotes: [],
        update: false,
        loadingStatus: false
    }

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            pages: [],
            userId: parseInt(sessionStorage.getItem("credentials")),
            day: "1",
            month: "january",
            modal: false,
            quotes: [],
            update: false
        };

    }

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })

    updateState = (event) => {
        if (this.state.update === false) {
          this.setState({ update: true })
        } else {
          this.setState({ update: false })
        }
      }

    toggleSidebar = (event) => {
        if (this.state.visible === false) {
          this.setState({ visible: true })
        } else {
          this.setState({ visible: false })
        }
      }

    toggle = (event) => {
        if (this.state.modal === false) {
          this.setState({ modal: true })
        } else {
          this.setState({ modal: false })
        }
      }

    constructNewPage = event => {
        // event.preventDefault();
    //Validates user input
        if (this.state.day === "") {
            alert("please select a day");
        } else {
            this.setState({ loadingStatus: true });

            PageDataManager.checkPages(this.props.bookId, this.state.month, this.state.day)
                .then(pages => {
                    console.log("bookId: ", this.props.bookId, "day: ", this.state.day)
                    if (pages.length > 0) {
                        this.setState({
                            pages: pages,
                            month: pages[0].month,
                            day: pages[0].day,
                            pageId: pages[0].id
                        })
                        console.log(this.state.pageId)
                        this.toggle()
                        this.toggleSidebar()
                        this.props.history.push(`/books/${this.props.bookId}/${this.state.pageId}/${this.state.month}/${this.state.day}`)
                    } else {

                    //creates a new object for the edited news item,
                        const newPage = {
                            userId: parseInt(sessionStorage.getItem("credentials")),
                            bookId: this.props.bookId,
                            month: "january",
                            day: this.state.day,
                            thought: ""
                        };
                        //posts the object to the database, gets all news items, updates state of news array
                        PageDataManager.postPage(newPage)
                            .then(page => {
                                console.log("page: ", page)
                                this.setState({
                                    pageId: page.id
                                })
                                console.log("pageId: ", this.state.pageId)
                                this.props.history.push(`/books/${this.props.bookId}/${this.state.pageId}/${this.state.month}/${this.state.day}`)
                                this.toggle()
                                this.toggleSidebar()
            
                            })
                    }
            })
        }
    }




    addPage = pageObject => {
        return PageDataManager.postPage(pageObject)
            .then(page => {
                this.setState({
                    pageId: page.id
                })
                console.log("pageId: ", this.state.pageId)
            })
            .then(() =>
                PageDataManager.getAllPages(this.state.userId)
                .then(pages => {
                    this.setState({
                        pages: pages
                    });
                })
            )
    };

    render() {
        const { visible } = this.state
        return (
        <>
            <div className="pageSelect">
                <Button icon="caret down" className="pageSelect__button" onClick={this.toggleSidebar}></Button>

            <Sidebar.Pushable >
                <div className="sidebar">
            <Sidebar
                as={Menu}
                color="grey"
                animation='push'
                icon='labeled'
                inverted
                onHide={this.handleSidebarHide}
                horizontal="true"
                direction='top'
                visible={visible}
                width='thin'
            >

                    <JanuarySelect
                        updateState={this.updateState}
                        addPage={this.addPage}
                        toggleSidebar={this.toggleSidebar}
                        toggle={this.toggle}
                        handleOpen={this.handleOpen}
                        handleClose={this.handleClose}
                        handleFieldChange={this.handleFieldChange}
                        constructNewPage={this.constructNewPage}
                        {...this.props}/>



                {/* <Menu.Item as={Link} to='/february/'
                className="sidebarButton"
                onClick={this.toggleSidebar}>
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
                </Menu.Item> */}

            </Sidebar>
            </div>
            <Sidebar.Pusher>
                <PageViews
                updateState={this.updateState}
                update={this.state.update}
                {...this.props}
                />
            </Sidebar.Pusher>
            </Sidebar.Pushable>
            </div>
        </>
        )
    }
}


export default PageMain