import React, { Component } from 'react'
import QuoteCard from './QuoteCard'
import QuoteDataManager from './QuoteDataManager'
import AddQuoteModal from './AddQuoteModal'
import { Button } from 'semantic-ui-react'


class QuoteList extends Component {
    state = {
        quotes: [],
        userId: parseInt(sessionStorage.getItem("credentials")),
        bookId: 0,
        month: "january",
        day: "1",
    }

    constructor(props) {
      super(props);
      this.state = {
          visible: false,
          pages: [],
          userId: parseInt(sessionStorage.getItem("credentials")),
          day: "1",
          month: "january",
          modalOpen: false,
          quotes: []
      }
    }


    componentDidMount() {
      this.props.renderPageQuotes(this.props.pageId)
      }


    componentDidUpdate(prevProps) {
      console.log("component update")
      if (this.props.pageId !== prevProps.pageId) {
        this.props.renderPageQuotes(this.props.pageId)
        this.setState({
          quotes: this.props.quotes
        })
        console.log("quotes in QuoteList state after update: ", this.state.quotes)
      }
    }


    render() {
        return (
            <React.Fragment>
              {/* <Button onClick={()=>this.props.renderPageQuotes(this.props.pageId)}>refresh</Button> */}
              <div className="quoteList__container">
                <div className="pageDay__container">
                    <h3>{this.props.month} {this.props.day}</h3>
                    <AddQuoteModal
                        className="addQuoteModal"
                        {...this.props}

                      />
                </div>

                  {this.props.quotes.map(quote => (
                <QuoteCard
                      key={quote.id}
                      quote={quote}
                      removeQuote={this.removeQuote}
                      postEditedQuote={this.props.postEditedQuote}
                      {...this.props}/>
                  ))}
              </div>
            </React.Fragment>
        )
    }
}


export default QuoteList