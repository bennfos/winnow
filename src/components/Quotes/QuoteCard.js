import React, { Component } from 'react'
import fetchJsonp from 'fetch-jsonp'
import EditQuoteModal from '../Quotes/EditQuoteModal'
import { Button } from 'semantic-ui-react'


class QuoteCard extends Component {
    state = {
        randomQuoteText: "",
        randomQuoteAuthor: "",
    }

    getAndDisplayRandomQuote = () => {
        fetchJsonp('http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en',
        {jsonpCallback: 'jsonp'})
        .then(function(response) {
          return response.json();
        })
        .then(response =>
            this.setState({
                randomQuoteText: response.quoteText,
                randomQuoteAuthor: response.quoteAuthor
            }))
        }

  render() {
    return (
        <>
            <div className="quoteCard">
                <div className="quoteCardContent">
                    <h3>{this.props.quote.quoteText}</h3>
                    <p>{this.props.quote.quoteAuthor}</p>
                </div>
                <EditQuoteModal
                postEditedQuote={this.props.postEditedQuote}
                {...this.props}/>
                <Button
                    size="mini"
                    onClick={() => this.props.removeQuote(this.props.quote.id)}
                    >delete
                </Button>
            </div>
        </>
    );
    }
}


export default QuoteCard