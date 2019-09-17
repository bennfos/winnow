import React, { Component } from 'react'
import { Card, CardBody } from 'reactstrap'
import '../Books/Card.css'

class SearchResultCard extends Component {


  render() {
    return (
        <>
            <Card className="card__container">
                <CardBody className="card__content">
                    <h4>{this.props.quote.quoteText}</h4>
                    <p>{this.props.quote.quoteAuthor}</p>
                </CardBody>
            </Card>
        </>
    );
    }
}


export default SearchResultCard