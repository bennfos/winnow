import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import QuoteDataManager from './QuoteDataManager'
import './Quotes.css'


class RandomQuote extends Component {
    state = {
        quoteText: "",
        quoteAuthor: ""
      };

      refreshRandomQuote = () => {
        QuoteDataManager.getRandomQuote()
            .then(quote => {
                this.setState({
                    quoteText: quote.quoteText,
                    quoteAuthor: quote.quoteAuthor
                })
        })
    }



    componentDidMount () {
        this.refreshRandomQuote()
        }


    render() {
       return (
        <>
            <div className="randomQuote__container">
                <div className="randomQuote__button">
                    <Button
                        circular
                        icon="quote left"
                        onClick={this.refreshRandomQuote}
                    ></Button>
                </div>
                <h4>{this.state.quoteText}</h4>
                <p>{this.state.quoteAuthor}</p>
            </div>
        </>
       )}
}

export default RandomQuote