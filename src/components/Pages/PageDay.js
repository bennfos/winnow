import React, { Component } from 'react'
import QuoteList from '../Quotes/QuoteList'
import ThoughtList from '../Thoughts/ThoughtList'
import { Transition } from 'semantic-ui-react'
import './PageDay.css'


class PageDay extends Component {
    state = {
        quotes: [],
        pages: [],
        userId: parseInt(sessionStorage.getItem("credentials")),
        thought: "",
      };


    render() {
        
        return (
            <React.Fragment>

                    <div className="quoteList__container">
                        <QuoteList
                            {...this.props}
                        />
                        <ThoughtList
                            {...this.props}
                        />
                    </div>

            </React.Fragment>
        )
    }
}

export default PageDay