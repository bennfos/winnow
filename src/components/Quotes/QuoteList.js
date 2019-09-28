import React, { Component } from 'react'
import QuoteCard from './QuoteCard'
import AddQuoteModal from './AddQuoteModal'
import AddRandomQuoteModal from './AddRandomQuoteModal'
import { Transition } from 'semantic-ui-react'
import './Quotes.css'
import '../Pages/Pages.css'


class QuoteList extends Component {
    state = {
        pageQuotes: [],
        userId: parseInt(sessionStorage.getItem("credentials")),
        bookId: 0,
        month: "january",
        day: "1",
        visible: true
    }

//when component mounts, update state of pageQuotes in PageMain
    componentDidMount() {
      this.props.renderPageQuotes(this.props.pageId)
      }

//When component receives new pageId in props (i.e., page is changed) from PageMain, update state in PageMain to cause a rerender of QuoteList
    componentDidUpdate(prevProps) {
      if (this.props.pageId !== prevProps.pageId) {
        this.props.renderPageQuotes(this.props.pageId)
        this.setState({
          pageQuotes: this.props.pageQuotes
        })
      }
    }


    render() {
      const visible = this.state.visible
        return (
            <React.Fragment>

              <div className="quoteList__contents">
                <div>
                  <div className="pageDay__container">
                    <div className="addRandomQuoteModal__container">
                      <AddRandomQuoteModal
                            {...this.props}
                      />
                    </div>
                    <div className="list__header">
                        <h1>{this.props.month} {this.props.day}</h1>
                        <AddQuoteModal
                            // className="addQuoteModal"
                            {...this.props}
                        />
                    </div>
                  </div>
                </div>

                <div>
                  {this.props.pageQuotes.map(pageQuote => (
                <QuoteCard
                      key={pageQuote.id}
                      pageQuote={pageQuote}
                      {...this.props}/>
                  ))}
                </div>

              </div>
              
            </React.Fragment>
        )
    }
}


export default QuoteList