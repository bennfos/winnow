import React, { Component } from 'react'
import QuoteDataManager from './QuoteDataManager'
import EditQuoteModal from '../Quotes/EditQuoteModal'
import { Button } from 'semantic-ui-react'
import { throwStatement } from '@babel/types';


class QuoteCard extends Component {
    state = {
        randomQuoteText: ""
    }

  getRandom = () => {
      QuoteDataManager.getRandomQuote()
        .then(quoteObj => {
            this.setState({
                randomQuoteText: quoteObj.quoteText
            })
        })
  }

  render() {
    return (
        <>
            <Button onClick={this.getRandom}>rando</Button>
            <p>{this.state.randomQuoteText}</p>
            <div className="quoteCard">
                <div className="quoteCardContent">
                    <h3>{this.props.quote.quote.quoteText}</h3>
                    <p>{this.props.quote.quote.quoteAuthor}</p>
                </div>
                <EditQuoteModal
                postEditedQuote={this.props.postEditedQuote}
                {...this.props}/>
                <Button
                    size="mini"
                    onClick={() => this.props.removeQuote(this.props.quote.id, this.props.pageId)}
                    >delete
                </Button>
            </div>
        </>
    );
    }
}


export default QuoteCard