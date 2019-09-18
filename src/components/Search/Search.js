import React, { Component } from 'react';
import { Input, InputGroup } from 'reactstrap';
import QuoteDataManager from '../Quotes/QuoteDataManager';
import SearchResultCard from './SearchResultCard';


class Search extends Component {

        state = {
            quotes: [],
            pages: "",
            pageQuotes: [],
            quoteText: "",
            quoteAuthor: "",
            userId: parseInt(sessionStorage.getItem("credentials")),
            loadingStatus:false,
            searchInput: "",
            searchResultObjects: []
        }




    handleFieldChange = (event) => {
        const stateToChange = {};
        stateToChange[event.target.id] = event.target.value;
        this.setState(stateToChange);
    }

//Search:
//1. Get all pageQuotes
//2. THEN map over pageQuotes and return an array of objects like this:
//3. Filter those objects to include only current user's pages with quotes
//4. Filter the array again to include only those object whose quoteText, quoteAuthor or month include the search input value
//5. In render method, map over filtered array to create SearchResultsCards


    searchPageQuotes = () => {
        QuoteDataManager.getAllPageQuotes()
            .then(pageQuotes => {
                const allPagesWithQuotes = pageQuotes.map(pageQuote => {
                    return {
                        id: pageQuote.id,
                        userId: pageQuote.page.userId,
                        bookId: pageQuote.page.bookId,
                        pageId: pageQuote.pageId,
                        month: pageQuote.page.month,
                        day: pageQuote.page.day,
                        quoteText: pageQuote.quote.quoteText,
                        quoteAuthor: pageQuote.quote.quoteAuthor
                    }})
                const filteredObjects = allPagesWithQuotes.filter(pageWithQuote => pageWithQuote.userId === this.state.userId)
                const searchResultObjects = filteredObjects.filter(filteredObject =>
                    filteredObject.quoteText.toLowerCase().includes(this.state.searchInput.toLowerCase())
                        || filteredObject.quoteAuthor.toLowerCase().includes(this.state.searchInput.toLowerCase())
                            || filteredObject.month.toLowerCase().includes(this.state.searchInput.toLowerCase()))
                this.setState({ searchResultObjects: searchResultObjects})
                console.log(this.state.searchResultObjects)
            })
}
    render() {
        return (
            <React.Fragment>
                <div>
                    <InputGroup size="lg">
                    <Input
                        onChange={this.handleFieldChange}
                        onKeyUp={this.searchPageQuotes}
                        type="text"
                        id="searchInput"
                        placeholder="enter keyword"
                        value={this.state.searchInput}
                        autoFocus>
                    </Input>
                    </InputGroup>
                        {this.state.searchResultObjects.map(searchResultObject => (
                    <SearchResultCard
                      key={searchResultObject.id}
                      searchResultObject={searchResultObject}
                      {...this.props}/>
                  ))}
                </div>
            </React.Fragment>
        )
    }
}

export default Search;
