import React, { Component } from 'react'
import { Sidebar, Menu, Button } from 'semantic-ui-react'
import './PageMain.css'
import PageDataManager from './PageDataManager'
import PageViews from './PageViews'
import QuoteDataManager from '../Quotes/QuoteDataManager'
import MonthSelect from '../MonthSelect/MonthSelect'

class PageMain extends Component {

    state = {
        visible: false,
        userId: parseInt(sessionStorage.getItem("credentials")),
        day: "",
        month: "",
        modal: false,
        pageId: 0,
        pages: [],
        quotes: [],
        thought: "",
        pageQuotes: [],
        monthOptions: ["january", "february", "march", "april", "may", "june", "july", "august", "september", "november", "december"]
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

      //set month in state when selected in month menu
    setMonth = (month) => {
        this.setState({
            month: month
        })
    }

    //set state of day when input is manipulated in the month menu
    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
        console.log(this.state)
    };

//Construct or navigate to page (called in Month components)
    constructOrNavigateToNewPage = () => {

    //Validates user input
        if (this.state.day === "") {
            alert("please select a day");
        } else {
            this.setState({ loadingStatus: true });

        //check to see if the page already exists in the database
            PageDataManager.checkPages(this.props.bookId, this.state.month, this.state.day)
                .then(pages => {

                //THEN, if it does exist, set state with that page's info, and push user to that page's view
                    if (pages.length > 0) {
                        console.log("constructOrNavigateToNewPage-navigate run")
                        this.setState({
                            pages: pages,
                            month: pages[0].month,
                            day: pages[0].day,
                            pageId: pages[0].id,
                            thought: pages[0].thought
                        })
                        this.props.history.push(`/books/${this.props.bookId}/${this.state.pageId}/${this.state.month}/${this.state.day}`)
                        this.toggle()
                        this.toggleSidebar()
                    } else {

                    //else, if the page does not exist yet, construct an object for that page
                        console.log("constructOrNavigateToNewPage-construct run")
                        const newPage = {
                            userId: parseInt(sessionStorage.getItem("credentials")),
                            bookId: this.props.bookId,
                            month: this.state.month,
                            day: this.state.day,
                            thought: ""
                        };
                        //post the page object to the database, THEN set state with that page's id, and push user to that page's view
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

//update state with appropriate quotes whenever page is changed (called in componentDidUpdate in QuoteList)
    renderPageQuotes = (pageId) => {
    //get quotes for the page that is passed in as an argument, and set them in state
        QuoteDataManager.getPageQuotes(pageId)
          .then(pageQuotes => {
            this.setState({
                pageQuotes: pageQuotes,
            })
          })
    }

//update state with appropriate thought whenever page is changed (called in componentDidUpdate ThoughtList)
    renderThought = (pageId) => {
    //get page data for page that is passed in as argument, and set thought in state
        PageDataManager.getPage(pageId)
            .then(page => {
                this.setState({
                    thought: page.thought
                })
            })
    }

    //Add quote and pageQuote to database (called in AddQuoteModal)
    addQuote = (quoteObject, pageId) => {
        //post new quote object to the database
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


//put edited quote object in database, then get all page quotes for that page and set them in state (called in EditQuoteModal)
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

//put page object with edited thought in database, then get the page and set thought in state (called in AddThoughtModal)
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


//delete quote from database, then get all pageQuotes and set them in state (called in QuoteCard)
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






    render() {
        const { visible } = this.state
        return (
        <>
            <div className="pageSelect">
                <Menu
                    fluid widths={1}
                    borderless
                    fixed="top"
                    inverted
                    color="grey"
                    >
                        <Menu.Item

                            onClick={this.toggleSidebar}
                            icon="chevron down"
                        >
                        </Menu.Item>
                </Menu>
            <div className="spacer"></div>
            <Sidebar.Pushable animation='push'>
                <div className="sidebar">
                <Sidebar
                    as={Menu}
                    color="grey"
                    animation='push'
                    icon='labeled'
                    inverted
                    horizontal="true"
                    direction='top'
                    visible={visible}
                    className="sidebar__menu"
                >
                {this.state.monthOptions.map(monthSelect => (
                    <MonthSelect
                        setMonth={this.setMonth}
                        toggleSidebar={this.toggleSidebar}
                        toggle={this.toggle}
                        handleFieldChange={this.handleFieldChange}
                        constructOrNavigateToNewPage={this.constructOrNavigateToNewPage}
                        monthSelect={monthSelect}
                        {...this.props}
                    />
                ))}

            </Sidebar>

            </div>
            <Sidebar.Pusher dimmed={this.state.visible}>
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