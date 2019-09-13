import React, { Component } from 'react'
import AddQuoteModal from '../Quotes/AddQuoteModal'
import QuoteList from '../Quotes/QuoteList'
import PageDataManager from '../Pages/PageDataManager'
import ThoughtsMain from '../Thoughts/ThoughtsMain'
import AddThoughtsModal from '../Thoughts/AddThoughtsModal'
import EditThoughtsModal from '../Thoughts/EditThoughtsModal'
import PageSelect from './Unused/PageSelect'
import QuoteDataManager from '../Quotes/QuoteDataManager'
import ReactDOM from "react-dom"
import './PageDay.css'


class PageDay extends Component {
    state = {
        pages: [],
        userId: parseInt(sessionStorage.getItem("credentials")),
        thought: "",
      };



    updateTopmostParent = event => {
        const topmostParent = ReactDOM.render(<PageDay />, document.getElementById('root'))
        topmostParent.setState({
            render: true
        })
    }


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
                <div className="quoteList__container">
                    <QuoteList
                        {...this.props}
                        updateTopmostParent={this.updateTopmostParent}/>
                    {/* <ThoughtsMain {...this.props}/> */}
                </div>
            </React.Fragment>
        )
    }
}

export default PageDay