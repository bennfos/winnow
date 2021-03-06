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
                        <div className="searchResult__card__header">
                            <h2>{this.props.searchResultObject.month} {this.props.searchResultObject.day}</h2>
                            <Button
                                as={Link}
                                to={`/books/${this.props.searchResultObject.bookId}/${this.props.searchResultObject.pageId}/${this.props.searchResultObject.month}/${this.props.searchResultObject.day}`}
                                icon="chevron right"
                                size="mini"                           >
                            </Button>
                        </div>
                        <h3>{this.props.searchResultObject.quoteText}</h3>
                        <h5>{this.props.searchResultObject.quoteAuthor}</h5>
                        <div
                            className="goToPage"
                        >

                        </div>
                    </CardBody>
                </Card>
            </div>
        </>
    );
    }
}


export default SearchResultCard