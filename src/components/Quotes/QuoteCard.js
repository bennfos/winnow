import React, { Component } from 'react'
import QuoteDataManager from './QuoteDataManager'
import EditQuoteModal from '../Quotes/EditQuoteModal'
import ConfirmDeleteQuoteModal from './ConfirmDeleteQuoteModal';
import '../Books/Card.css'
import './Quotes.css'


class QuoteCard extends Component {
    state = {
        randomQuoteText: "",
        display: "hide"
    }


//get random quote from Forismatic API and set it in state (not used yet--stretch goal)
  getRandom = () => {
      QuoteDataManager.getRandomQuote()
        .then(quoteObj => {
            this.setState({
                randomQuoteText: quoteObj.quoteText,
                randomQuoteAuthor: quoteObj.quoteAuthor
            })
        })
  }

  toggleEditAndDelete = () => {
      if (this.state.display === "hide") {
        this.setState({
            display: "show"
        })
    } else if (this.state.display === "show") {
        this.setState({
            display: "hide"
        })
    }
}

  render() {
    return (
        <>
            <div
                className="card__container"
                onClick={this.toggleEditAndDelete}>
                <div
                    className="card__content"
                    >
                    <h4>{this.props.pageQuote.quote.quoteText}</h4>
                    <p>{this.props.pageQuote.quote.quoteAuthor}</p>
                </div>
                <div className="editAndDelete">
                    <div className={this.state.display}>
                        <ConfirmDeleteQuoteModal
                            {...this.props}
                        />
                        <EditQuoteModal
                            {...this.props}/>
                    </div>
                </div>
            </div>
        </>
    );
    }
}


export default QuoteCard