import React, { Component } from 'react'
import QuoteCard from './QuoteCard'
import QuoteDataManager from './QuoteDataManager'
import AddQuoteModal from './AddQuoteModal'
import { Button } from 'semantic-ui-react'


class QuoteList extends Component {
    state = {
        pageQuotes: [],
        userId: parseInt(sessionStorage.getItem("credentials")),
        bookId: 0,
        month: "january",
        day: "1",
    }

    componentDidMount() {
      this.props.renderPageQuotes(this.props.pageId)
      }


    componentDidUpdate(prevProps) {

      if (this.props.pageId !== prevProps.pageId) {
        this.props.renderPageQuotes(this.props.pageId)
        this.setState({
          pageQuotes: this.props.pageQuotes
        })

      }
    }


    render() {
        return (
            <React.Fragment>

              <div className="quoteList__container">
                <div className="pageDay__container">
                    <h3>{this.props.month} {this.props.day}</h3>
                    <AddQuoteModal
                        className="addQuoteModal"
                        {...this.props}

                      />
                </div>

                  {this.props.pageQuotes.map(pageQuote => (
                <QuoteCard
                      key={pageQuote.id}
                      pageQuote={pageQuote}
                      {...this.props}/>
                  ))}
              </div>
            </React.Fragment>
        )
    }
}


export default QuoteList