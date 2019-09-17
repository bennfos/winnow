import React, { Component } from 'react'
import QuoteDataManager from './QuoteDataManager'
import EditQuoteModal from '../Quotes/EditQuoteModal'
import { Button } from 'semantic-ui-react'
import { throwStatement } from '@babel/types';
import ConfirmDeleteQuoteModal from './ConfirmDeleteQuoteModal';
import '../Books/Card.css'

class QuoteCard extends Component {
    state = {
        randomQuoteText: ""
    }

  getRandom = () => {
      QuoteDataManager.getRandomQuote()
        .then(quoteObj => {
            this.setState({
                randomQuoteText: quoteObj.quoteText
            })
        })
  }

  render() {
    return (
        <>
            <div className="card__container">
                <div className="card__content">
                    <h4>{this.props.pageQuote.quote.quoteText}</h4>
                    <p>{this.props.pageQuote.quote.quoteAuthor}</p>
                </div>
                <div className="card__header">
                    <div className="editAndDelete__container">
                        <EditQuoteModal
                            {...this.props}/>
                        <ConfirmDeleteQuoteModal
                            {...this.props}
                        />
                    </div>
                </div>
            </div>
        </>
    );
    }
}


export default QuoteCard