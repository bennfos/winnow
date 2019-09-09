import React, { Component } from 'react'
import getRandomQuote from '../DataManager/GetForismaticQuote'


class QuoteCard extends Component {
    state = {
        quoteText: "",
        quoteAuthor: ""
      };

    getAndDisplayRandomQuote = () => {
        getRandomQuote.getRandomQuote()
            .then(quote => {
                this.setState({
                    quoteText: quote.quoteText,
                    quoteAuthor: quote.quoteAuthor
                })
                console.log(this.state)
            })
    }


    render() {
       return (
        <>
            <button type="button" onClick={()=>this.getAndDisplayRandomQuote()}>getQuote</button>
            <p>{this.state.quoteText}</p>
            <p>{this.state.quoteAuthor}</p>
        </>
       )}
}

export default QuoteCard