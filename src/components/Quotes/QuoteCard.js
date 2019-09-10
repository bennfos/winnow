import React, { Component } from 'react'
import fetchJsonp from 'fetch-jsonp'
import EditQuoteModal from '../Quotes/EditQuoteModal'


class QuoteCard extends Component {

  render() {
    return (
        <>
            <div className="quoteCard">
                <div className="quoteCardContent">
                    <h3>{this.props.quote.quoteText}</h3>
                    <p>{this.props.quote.quoteAuthor}</p>
                </div>
            </div>
        </>
    );
    }
}


export default QuoteCard