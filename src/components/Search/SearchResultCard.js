import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardBody } from 'reactstrap'
import { Button } from 'semantic-ui-react'
import '../Books/Card.css'

class SearchResultCard extends Component {


  render() {
    return (
        <>
            <div className="searchResult__card">
                <Card className="card__container">

                    <CardBody >
                        <h2>{this.props.searchResultObject.month} {this.props.searchResultObject.day}</h2>
                        <h4>{this.props.searchResultObject.quoteText}</h4>
                        <p>{this.props.searchResultObject.quoteAuthor}</p>
                        <div
                            className="goToPage"
                        >
                            <Button
                            as={Link} to={`/books/${this.props.searchResultObject.bookId}/${this.props.searchResultObject.pageId}/${this.props.searchResultObject.month}/${this.props.searchResultObject.day}`}
                        >go</Button>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </>
    );
    }
}


export default SearchResultCard