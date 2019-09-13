import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import EditPage from './EditPageModal'
import {Button, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Col, Row} from 'reactstrap'

class PageCard extends Component {

  //Renders an individual news card with an article title, synopsis, link to URL, and edit and delete buttons.

  render() {
    return (

        <div className="bookCard">
            <Row>
                <Col sm="6">
                    <Card body onClick={() => console.log("clicked")}>
                        <CardText>{this.props.page.month}</CardText>
                        <CardText>{this.props.page.day}</CardText>
                        <Link to={`/pages/${this.props.page.id}`}><button>view</button></Link>
                        <Button color="danger" onClick={() => this.props.removePage(this.props.page.id)}>delete</Button>
                    </Card>
                </Col>
            </Row>
        </div>
    );
  }
}

export default PageCard
