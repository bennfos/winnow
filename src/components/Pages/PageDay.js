import React, { Component } from 'react'
import QuoteList from '../Quotes/QuoteList'
import PageDataManager from '../Pages/PageDataManager'
import AddThoughtModal from '../Thoughts/AddThoughtModal'
import ThoughtCard from '../Thoughts/ThoughtCard'
import './PageDay.css'


class PageDay extends Component {
    state = {
        quotes: [],
        pages: [],
        userId: parseInt(sessionStorage.getItem("credentials")),
        thought: "",
      };


//When component mounts, gets all news and sets state of news array with all existsing news items
// componentDidMount() {
//     PageDataManager.checkPages(this.props.bookId, this.props.month, this.props.day)
//         .then(pages => {
//             this.setState({
//                 pages: pages,
//                 month: this.props.month,
//                 day: this.props.day,
//                 thought: this.props.thought
//         })
//     })
// }



    render() {
        // console.log(this.state)
        return (
            <React.Fragment>
                <div className="quoteList__container">
                    <QuoteList
                        {...this.props}
                        />
                    <AddThoughtModal {...this.props} />
                    <ThoughtCard {...this.props}/>
                </div>
            </React.Fragment>
        )
    }
}

export default PageDay