import React, { Component } from 'react'
import AddQuoteModal from '../Quotes/AddQuoteModal'
import QuoteList from '../Quotes/QuoteList'
import PageDataManager from '../Pages/PageDataManager'
import ThoughtsMain from '../Thoughts/ThoughtsMain'
import AddThoughtsModal from '../Thoughts/AddThoughtsModal'
import EditThoughtsModal from '../Thoughts/EditThoughtsModal'
import PageSelect from './PageSelect'

class PageDay extends Component {
    state = {
        pages: [],
        userId: parseInt(sessionStorage.getItem("credentials")),
        thought: "",
      };

//When component mounts, gets all news and sets state of news array with all existsing news items
componentDidMount() {
    PageDataManager.checkPages(this.props.bookId, this.props.month, this.props.day)
        .then(pages => {
            this.setState({
                pages: pages,
                month: this.props.month,
                day: this.props.day
            })
        })
        .then(()=> console.log(this.state.pages))
    };


    render() {
        // console.log(this.state)
        return (
            <React.Fragment>
                <h3>{this.props.month} {this.props.day}</h3>
                {/* <QuoteList {...this.props}/> */}
                {/* <ThoughtsMain {...this.props}/> */}
            </React.Fragment>
        )
    }
}

export default PageDay