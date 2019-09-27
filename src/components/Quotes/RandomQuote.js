import React, { Component } from 'react'
import { Fade } from 'reactstrap'
import { Button, Transition } from 'semantic-ui-react'
import QuoteDataManager from './QuoteDataManager'
import './Quotes.css'


class RandomQuote extends Component {
    state = {
        quoteText: "",
        quoteAuthor: "",
        enter: false,
        fadeIn: true
      };

      refreshRandomQuote = () => {
        QuoteDataManager.getRandomQuote()
            .then(quote => {
                this.setState({
                    quoteText: quote.quoteText,
                    quoteAuthor: quote.quoteAuthor
                })
        })
    }

    toggle = () => {
        this.setState({
            fadeIn: !this.state.fadeIn,
        });
    }


    componentDidMount () {
        this.refreshRandomQuote()
        }


    render() {
       return (
        <>
            <div className="randomQuote__container">
                <div className="randomQuote__button">
                        <Button
                            circular
                            icon="quote left"
                            onMouseDown={this.toggle}
                            onClick={() => {
                                this.refreshRandomQuote()
                                this.toggle()
                                }
                            }
                        ></Button>
                </div>
                <div>
                    <Fade in={this.state.fadeIn} tag='h4' timeout={600}>
                        {this.state.quoteText}
                    </Fade>
                    <Fade in={this.state.fadeIn} tag='p' timeout={600}>
                        {this.state.quoteAuthor}
                    </Fade>
                </div>
            </div>
        </>
       )}
}

export default RandomQuote