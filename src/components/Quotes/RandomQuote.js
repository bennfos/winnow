import React, { Component } from 'react'
import fetchJsonp from 'fetch-jsonp'


class RandomQuote extends Component {
    state = {
        quoteText: "",
        quoteAuthor: ""
      };

    getAndDisplayRandomQuote = () => {
        fetchJsonp('http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en',
        {jsonpCallback: 'jsonp'})
        .then(function(response) {
          return response.json();
        })
        .then(response =>
            this.setState({
                quoteText: response.quoteText,
                quoteAuthor: response.quoteAuthor
            }))
        }

    render() {
       return (
        <>
            <button type="button" onClick={()=>this.getAndDisplayRandomQuote()}>Get Quote</button>
            <p>{this.state.quoteText}</p>
            <p>{this.state.quoteAuthor}</p>
        </>
       )}
}

export default RandomQuote