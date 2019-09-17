import React, { Component } from 'react'
import QuoteList from '../Quotes/QuoteList'
import PageDataManager from '../Pages/PageDataManager'
import AddThoughtModal from '../Thoughts/AddThoughtModal'
import ThoughtList from '../Thoughts/ThoughtList'
import './PageDay.css'


class PageDay extends Component {
    state = {
        quotes: [],
        pages: [],
        userId: parseInt(sessionStorage.getItem("credentials")),
        thought: "",
      };


    render() {
        // console.log(this.state)
        return (
            <React.Fragment>
                <div className="quoteList__container">
                    <QuoteList
                        {...this.props}
                        />
                    <ThoughtList {...this.props}/>
                </div>
            </React.Fragment>
        )
    }
}

export default PageDay