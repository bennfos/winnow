import React, { Component } from 'react';
import { Input, InputGroup } from 'reactstrap';
import QuoteDataManager from '../Quotes/QuoteDataManager';
import SearchResultCard from './SearchResultCard';
import './Search.css'


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

    searchPageQuotes = () => {
    //1. Get all pageQuotes
        QuoteDataManager.getAllPageQuotes()
            .then(pageQuotes => {
            //2. THEN map over pageQuotes and return an array of objects with relevant properties
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
            //3. Filter those objects to include only current user's pages with quotes
                const filteredObjects = allPagesWithQuotes.filter(pageWithQuote => pageWithQuote.userId === this.state.userId)
            //4. Filter the array again to include only those object whose quoteText, quoteAuthor or month include the search input value
                const searchResultObjects = filteredObjects.filter(filteredObject =>
                    filteredObject.quoteText.toLowerCase().includes(this.state.searchInput.toLowerCase())
                        || filteredObject.quoteAuthor.toLowerCase().includes(this.state.searchInput.toLowerCase())
                            || filteredObject.month.toLowerCase().includes(this.state.searchInput.toLowerCase()))
                this.setState({ searchResultObjects: searchResultObjects})
            })
    }

    componentDidMount () {
        document.body.classList.add('bk2')
    }

    componentWillUnmount () {
        document.body.classList.remove('bk2')
    }

    render() {
        return (
            <React.Fragment>
                <div className="search__container">
                    <div className="search__input">
                        <InputGroup size="lg">
                        <Input
                            onChange={this.handleFieldChange}
                            onKeyUp={this.searchPageQuotes}
                            type="text"
                            id="searchInput"
                            placeholder="search by text, author, or month"
                            value={this.state.searchInput}
                            autoFocus>
                        </Input>
                        </InputGroup>
                    </div>
                    <div className="results__container">
                        {this.state.searchResultObjects.map(searchResultObject => (
                    <SearchResultCard
                      key={searchResultObject.id}
                      searchResultObject={searchResultObject}
                      {...this.props}/>
                  ))}
                  </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Search;
