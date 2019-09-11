import React, { Component } from 'react'
import AddQuoteModal from '../Quotes/AddQuoteModal'
import QuoteList from '../Quotes/QuoteList'
import QuoteDataManager from '../Quotes/QuoteDataManager'
import ThoughtsMain from '../Thoughts/ThoughtsMain'
import AddThoughtsModal from '../Thoughts/AddThoughtsModal'
import EditThoughtsModal from '../Thoughts/EditThoughtsModal'
import PageSelect from './PageSelect'

class PageDay extends Component {
    state = {
        quotes: [],
        userId: parseInt(sessionStorage.getItem("credentials")),
        bookId: 0,
        month: 0,
        day: 0,
        thought: ""
      };




    render() {
        return (
            <React.Fragment>
                <h3>Hi</h3>
                {/* <QuoteList {...this.props}/> */}
                {/* <ThoughtsMain {...this.props}/> */}
            </React.Fragment>
        )
    }
}

export default PageDay