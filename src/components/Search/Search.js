import React, { Component } from 'react';
import { Input, Card, CardBody } from 'reactstrap';
import QuoteDataManager from '../Quotes/QuoteDataManager';
import SearchResultCard from './SearchResultCard';



class Search extends Component {

        state = {
            quotes: [],
            pages: "",
            quoteText: "",
            quoteAuthor: "",
            userId: parseInt(sessionStorage.getItem("credentials")),
            loadingStatus:false,
            searchInput: "",
        }




    handleFieldChange = (event) => {
        const stateToChange = {};
        stateToChange[event.target.id] = event.target.value;
        this.setState(stateToChange);
    }


    searchPageQuotes = () => {
        QuoteDataManager.queryUserQuotes(this.state.userId, this.state.searchInput)
            .then(quotes => {
            this.setState({ quotes: quotes });
            console.log(quotes)
        })

    }



    render() {
        return (
            <React.Fragment>
                <div>
                    <Input
                        size="lg"
                        onChange={this.handleFieldChange}
                        onKeyUp={this.searchPageQuotes}
                        type="text"
                        id="searchInput"
                        placeholder="enter keyword"
                        // value={this.state.searchInput}
                        autoFocus>
                    </Input>
                    {this.state.quotes.map(quote => (
                    <SearchResultCard
                      key={quote.id}
                      quote={quote}
                      {...this.props}/>
                  ))}
                </div>
            </React.Fragment>
        )
    }
}

export default Search;
