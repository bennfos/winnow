import React, { Component } from 'react'
import { Sidebar, Menu, Icon, Segment, Button } from 'semantic-ui-react'
import './PageMain.css'
import PageDataManager from './PageDataManager'
import PageViews from './PageViews'
import QuoteDataManager from '../Quotes/QuoteDataManager'
import JanuarySelect from '../MonthSelect/JanuarySelect';
import FebruarySelect from '../MonthSelect/FebruarySelect';
import MarchSelect from '../MonthSelect/FebruarySelect';
import AprilSelect from '../MonthSelect/AprilSelect';
import MaySelect from '../MonthSelect/MaySelect';
import JuneSelect from '../MonthSelect/JuneSelect';
import JulySelect from '../MonthSelect/JulySelect';
import AugustSelect from '../MonthSelect/AugustSelect';
import SeptemberSelect from '../MonthSelect/SeptemberSelect';
import OctoberSelect from '../MonthSelect/OctoberSelect';
import NovemberSelect from '../MonthSelect/NovemberSelect';
import DecemberSelect from '../MonthSelect/DecemberSelect';

class PageMain extends Component {

    state = {
        visible: false,
        userId: parseInt(sessionStorage.getItem("credentials")),
        day: "1",
        month: "january",
        modal: false,
        pageId: 0,
        pages: [],
        quotes: [],
        thought: "",
        pageQuotes: []
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
            thought: "",
            pageQuotes: []
        };

        this.renderPageQuotes = this.renderPageQuotes.bind(this);
    }

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
        console.log(this.state)
    };

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

    setMonth = (month) => {
        this.setState({
            month: month
        })
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
                    (console.log("checkPages: ", pages))
                    if (pages.length > 0) {
                        console.log("constructNewPage-navigate run")

                        this.setState({
                            pages: pages,
                            month: pages[0].month,
                            day: pages[0].day,
                            pageId: pages[0].id,
                            thought: pages[0].thought
                        })

                        this.toggle()
                        this.toggleSidebar()
                        this.props.history.push(`/books/${this.props.bookId}/${this.state.pageId}/${this.state.month}/${this.state.day}`)
                    } else {
                        console.log("constructNewPage-create run")

                        const newPage = {
                            userId: parseInt(sessionStorage.getItem("credentials")),
                            bookId: this.props.bookId,
                            month: this.state.month,
                            day: this.state.day,
                            thought: ""
                        };
                        //posts the object to the database, gets all news items, updates state of news array
                        PageDataManager.postPage(newPage)
                            .then(page => {

                                this.setState({
                                    pageId: page.id
                                })

                                this.props.history.push(`/books/${this.props.bookId}/${this.state.pageId}/${this.state.month}/${this.state.day}`)
                                this.toggle()
                                this.toggleSidebar()

                            })
                    }
            })
        }
    }

    renderPageQuotes = (pageId) => {

        QuoteDataManager.getPageQuotes(pageId)
          .then(pageQuotes => {

            this.setState({
                pageQuotes: pageQuotes,

            })

          })
    }

    renderThought = (pageId) => {
        PageDataManager.getPage(pageId)
            .then(page => {
                this.setState({
                    thought: page.thought
                })
            })
    }

    putEditedQuote = (quoteObject, pageId) => {
        return QuoteDataManager.editQuote(quoteObject)
            .then(() => {
                QuoteDataManager.getPageQuotes(pageId)
                .then(pageQuotes => {
                    this.setState({
                        pageQuotes: pageQuotes,
                    })
                })
            })
    }


    putThought = (pageObject, pageId) => {
        PageDataManager.editPage(pageObject)
            .then(()=> {
                PageDataManager.getPage(pageId)
                .then(page => {
                    this.setState({
                        thought: page.thought
                })
                })
            })
    }

    addQuote = (quoteObject, pageId) => {
        return QuoteDataManager.postQuote(quoteObject)
            .then(quote => {
              //construct a new pageQuote object
              const newPageQuote = {
                quoteId: quote.id,
                pageId: parseInt(pageId)
              }
              //post the new pageQuote to the database
              QuoteDataManager.savePageQuote(newPageQuote)
                .then(() => {
                  QuoteDataManager.getPageQuotes(pageId)
                    .then(pageQuotes => {
                      this.setState({
                          pageQuotes: pageQuotes
                      })

              });
            });
          });
        };


    removeQuote = (id, pageId) => {
        QuoteDataManager.deleteQuote(id)
            .then(() => {
                QuoteDataManager.getPageQuotes(pageId)
                    .then(pageQuotes => {
                        this.setState({
                            pageQuotes: pageQuotes,
                        })

                    })
            })
    };


//posts new page object to database, then sets state with pageId, then gets all pageQuotes for that user and sets them in state
    addPage = pageObject => {
        console.log("addPage run")
        return PageDataManager.postPage(pageObject)
            .then(page => {
                this.setState({
                    pageId: page.id
                })

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
                <Button icon="chevron down" className="pageSelect__button" onClick={this.toggleSidebar}></Button>

            <Sidebar.Pushable animation='push'>
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
                        addPage={this.addPage}
                        setMonth={this.setMonth}
                        toggleSidebar={this.toggleSidebar}
                        toggle={this.toggle}
                        handleFieldChange={this.handleFieldChange}
                        constructNewPage={this.constructNewPage}
                        {...this.props}/>

                    <FebruarySelect
                        addPage={this.addPage}
                        setMonth={this.setMonth}
                        toggleSidebar={this.toggleSidebar}
                        toggle={this.toggle}
                        handleFieldChange={this.handleFieldChange}
                        constructNewPage={this.constructNewPage}
                        {...this.props}/>

                    <MarchSelect
                        addPage={this.addPage}
                        setMonth={this.setMonth}
                        toggleSidebar={this.toggleSidebar}
                        toggle={this.toggle}
                        handleFieldChange={this.handleFieldChange}
                        constructNewPage={this.constructNewPage}
                        {...this.props}/>

                    <AprilSelect
                        addPage={this.addPage}
                        setMonth={this.setMonth}
                        toggleSidebar={this.toggleSidebar}
                        toggle={this.toggle}
                        handleFieldChange={this.handleFieldChange}
                        constructNewPage={this.constructNewPage}
                        {...this.props}/>

                    <MaySelect
                        addPage={this.addPage}
                        setMonth={this.setMonth}
                        toggleSidebar={this.toggleSidebar}
                        toggle={this.toggle}
                        handleFieldChange={this.handleFieldChange}
                        constructNewPage={this.constructNewPage}
                        {...this.props}/>

                    <JuneSelect
                        addPage={this.addPage}
                        setMonth={this.setMonth}
                        toggleSidebar={this.toggleSidebar}
                        toggle={this.toggle}
                        handleFieldChange={this.handleFieldChange}
                        constructNewPage={this.constructNewPage}
                        {...this.props}/>

                    <JulySelect
                        addPage={this.addPage}
                        setMonth={this.setMonth}
                        toggleSidebar={this.toggleSidebar}
                        toggle={this.toggle}
                        handleFieldChange={this.handleFieldChange}
                        constructNewPage={this.constructNewPage}
                        {...this.props}/>

                    <AugustSelect
                        addPage={this.addPage}
                        setMonth={this.setMonth}
                        toggleSidebar={this.toggleSidebar}
                        toggle={this.toggle}
                        handleFieldChange={this.handleFieldChange}
                        constructNewPage={this.constructNewPage}
                        {...this.props}/>

                    <SeptemberSelect
                        addPage={this.addPage}
                        setMonth={this.setMonth}
                        toggleSidebar={this.toggleSidebar}
                        toggle={this.toggle}
                        handleFieldChange={this.handleFieldChange}
                        constructNewPage={this.constructNewPage}
                        {...this.props}/>

                    <OctoberSelect
                        addPage={this.addPage}
                        setMonth={this.setMonth}
                        toggleSidebar={this.toggleSidebar}
                        toggle={this.toggle}
                        handleFieldChange={this.handleFieldChange}
                        constructNewPage={this.constructNewPage}
                        {...this.props}/>

                    <NovemberSelect
                        addPage={this.addPage}
                        setMonth={this.setMonth}
                        toggleSidebar={this.toggleSidebar}
                        toggle={this.toggle}
                        handleFieldChange={this.handleFieldChange}
                        constructNewPage={this.constructNewPage}
                        {...this.props}/>

                    <DecemberSelect
                        addPage={this.addPage}
                        setMonth={this.setMonth}
                        toggleSidebar={this.toggleSidebar}
                        toggle={this.toggle}
                        handleFieldChange={this.handleFieldChange}
                        constructNewPage={this.constructNewPage}
                        {...this.props}/>

            </Sidebar>
            </div>
            <Sidebar.Pusher>
                <PageViews
                putEditedQuote={this.putEditedQuote}
                addQuote={this.addQuote}
                removeQuote={this.removeQuote}
                renderPageQuotes={this.renderPageQuotes}
                putThought={this.putThought}
                thought={this.state.thought}
                pageQuotes={this.state.pageQuotes}
                renderThought={this.renderThought}
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