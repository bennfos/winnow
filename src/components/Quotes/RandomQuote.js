import React, { Component } from 'react'
import { Button, Transition } from 'semantic-ui-react'
import QuoteDataManager from './QuoteDataManager'
import './Quotes.css'


class RandomQuote extends Component {
    state = {
        quoteText: "",
        quoteAuthor: "",
        enter: false,
        visible: true
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

    handleVisibility = () =>
    this.setState((prevState) => ({ visible: !prevState.visible }))



    componentDidMount () {
        this.refreshRandomQuote()
        }


    render() {
        const visible = this.state.visible
       return (
        <>
            <div className="randomQuote__container">
                <div className="randomQuote__button">
                        <Button
                            circular
                            icon="quote left"
                            onMouseDown={() => {
                                this.handleVisibility()
                                setTimeout(this.refreshRandomQuote, 800)
                            }}
                            onClick={() => {
                                this.handleVisibility()
                                }
                            }
                        ></Button>
                </div>
                <div>
                    <Transition visible={visible} transitionOnMount animation="fade down" duration={1000}>

                        <h4>{this.state.quoteText}</h4>

                    </Transition>
                    <Transition visible={visible} transitionOnMount animation="fade down" duration={1000}>
                        <p>{this.state.quoteAuthor}</p>
                    </Transition>
                </div>
            </div>
        </>
       )}
}

export default RandomQuote