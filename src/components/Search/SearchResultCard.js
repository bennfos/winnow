import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardBody } from 'reactstrap'
import { Icon, Button } from 'semantic-ui-react'
import '../Books/Card.css'

class SearchResultCard extends Component {


  render() {
    return (
        <>
            <Card className="card__container">
                <CardBody className="card__content">
                    <h4>{this.props.searchResultObject.quoteText}</h4>
                    <p>{this.props.searchResultObject.quoteAuthor}</p>
                    <div
                        className="goToPage"

                    >
                        <p>{this.props.searchResultObject.month} {this.props.searchResultObject.day}</p>
                        <Button
                            as={Link} to={`/books/${this.props.searchResultObject.bookId}/${this.props.searchResultObject.pageId}/${this.props.searchResultObject.month}/${this.props.searchResultObject.day}`}
                        >go</Button>
                    </div>
                </CardBody>
            </Card>
        </>
    );
    }
}


export default SearchResultCard