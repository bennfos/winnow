import React, { Component } from 'react'
import QuoteCard from './QuoteCard'
import QuoteDataManager from './QuoteDataManager'
import AddQuoteModal from './AddQuoteModal'
import { Button } from 'semantic-ui-react'


class QuoteList extends Component {
    state = {
        quotes: this.props.quotes,
        userId: parseInt(sessionStorage.getItem("credentials")),
        bookId: 0,
        month: "",
        day: "",



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
          quotes: this.props.quotes,


      };

      }


    componentDidUpdate() {
if (this.props.count < 100) {
  this.props.renderPageQuotes(this.props.pageId)
}






      // const currentPageId = parseInt(this.props.pageId)
      //   QuoteDataManager.getPageQuotes(currentPageId)
      //     .then(pageQuotes => {
      //       console.log(pageQuotes)
      //       const quotesForPage = pageQuotes.map(pageQuote => {
      //         return ({
      //           id: pageQuote.quote.id,
      //           quoteText: pageQuote.quote.quoteText,
      //           quoteAuthor: pageQuote.quote.quoteAuthor,
      //           timestamp: pageQuote.quote.timestamp
      //         })
      //       })
      //       this.setState({
      //           quotes: quotesForPage,
      //       })
      //       console.log(this.state.quotes)
      //     })
    }



  // Called in NewsItemNewModal (child component) to post a new object to database and update state
  addQuote = quoteObject => {
    const currentPageId = parseInt(this.props.pageId)
    return QuoteDataManager.postQuote(quoteObject)
        .then(quote => {

          //construct a new pageQuote object
          const newPageQuote = {
            quoteId: quote.id,
            pageId: parseInt(this.props.pageId)
          }

          //post the new pageQuote to the database
          QuoteDataManager.savePageQuote(newPageQuote)
            .then(pageQuote => console.log(pageQuote)
            )

            .then(() => {
              QuoteDataManager.getPageQuotes(currentPageId)
                .then(pageQuotes => {
                  const quotesForPage = pageQuotes.map(pageQuote => {
                    return ({
                      id: pageQuote.quote.id,
                      quoteText: pageQuote.quote.quoteText,
                      quoteAuthor: pageQuote.quote.quoteAuthor,
                      timestamp: pageQuote.quote.timestamp
                    })
                  })
                  this.setState({
                      quotes: quotesForPage
                  })

                  console.log(this.state.quotes)
          });
        });
      });
    };


  // Called in NewsCard(child component) to delete object from database and update state
  removeQuote = id => {
    QuoteDataManager.deleteQuote(id)
        .then(() => {
            QuoteDataManager.getPageQuotes(this.props.pageId)
                .then(pageQuotes => {
                  const quotesForPage = pageQuotes.map(pageQuote => {
                    return ({
                      id: pageQuote.quote.id,
                      quoteText: pageQuote.quote.quoteText,
                      quoteAuthor: pageQuote.quote.quoteAuthor,
                      timestamp: pageQuote.quote.timestamp
                    })
                  })
                  this.setState({
                      quotes: quotesForPage
                  })
                })
        })
  };


  // Called in NewEditModal (child component) to post edited object to database and update state
  postEditedQuote = id => {
    return QuoteDataManager.editQuote(id)
        .then(() => {
          QuoteDataManager.getPageQuotes(this.props.pageId)
          .then(pageQuotes => {
            const quotesForPage = pageQuotes.map(pageQuote => {
              return ({
                id: pageQuote.quote.id,
                quoteText: pageQuote.quote.quoteText,
                quoteAuthor: pageQuote.quote.quoteAuthor,
                timestamp: pageQuote.quote.timestamp
              })
            })
            this.setState({
                quotes: quotesForPage
            })
          })
        })
  }


    render() {
        return (
            <React.Fragment>
              <Button onClick={()=>this.props.renderPageQuotes(this.props.pageId)}>refresh</Button>
              <div className="quoteList__container">
                <div className="pageDay__container">
                    <h3>{this.props.month} {this.props.day}</h3>
                    <AddQuoteModal
                        className="addQuoteModal"
                        {...this.props}
                        addQuote={this.addQuote}
                      />
                </div>

                  {this.props.quotes.map(quote => (
                <QuoteCard
                      key={quote.id}
                      quote={quote}
                      removeQuote={this.removeQuote}
                      postEditedQuote={this.postEditedQuote}
                      {...this.props}/>
                  ))}
              </div>
            </React.Fragment>
        )
    }
}


export default QuoteList