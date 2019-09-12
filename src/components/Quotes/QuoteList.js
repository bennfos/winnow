import React, { Component } from 'react'
import QuoteCard from './QuoteCard'
import QuoteDataManager from './QuoteDataManager'
import AddQuoteModal from './AddQuoteModal'


class QuoteList extends Component {
    state = {
        quotes: [],
        userId: parseInt(sessionStorage.getItem("credentials")),
        bookId: 0,
        month: 0,
        day: 0
        }

    componentDidMount() {
        QuoteDataManager.getAllUserQuotes(this.state.userId)
          .then(quotes => {
            this.setState({
              quotes: quotes,
            });
          })
      }


  // Called in NewsItemNewModal (child component) to post a new object to database and update state
  addQuote = quoteObject => {
    return QuoteDataManager.postQuote(quoteObject)
        .then(quote => {

          //use quote.id and pageId to create an object, then post to pageQuotes table

            QuoteDataManager.getAllUserQuotes(this.state.userId)
                .then(quotes => {
                    this.setState({
                        quotes: quotes
          });
        });
      });
    };


  // Called in NewsCard(child component) to delete object from database and update state
  removeQuote = id => {
    QuoteDataManager.deleteQuote(id)
        .then(() => {
            QuoteDataManager.getAllUserQuotes(this.state.userId)
                .then(quotes => {
          this.setState({
            quotes: quotes
          });
        });
      });
  };

  // Called in NewEditModal (child component) to post edited object to database and update state
  postEditedQuote = id => {
    return QuoteDataManager.editQuote(id)
        .then(() => {
            QuoteDataManager.getAllUserQuotes(this.state.userId)
                .then(quotes => {
                    this.setState({
                        quotes: quotes
          });
        });
      });
  };

    render() {
        return (
            <React.Fragment>
                {this.state.quotes.map(quote => (
                <QuoteCard
                    key={quote.id}
                    quote={quote}
                    {...this.props}/>
                ))}
                <AddQuoteModal
                  className="addQuoteModal"
                  {...this.props}
                  addQuote={this.addQuote}/>
            </React.Fragment>
        )
    }
}


export default QuoteList