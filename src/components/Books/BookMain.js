import React, { Component } from 'react';
import BookList from "./BookList"


class BookMain extends Component {

componentDidMount () {
    document.body.classList.add('bk2')
}

componentWillUnmount () {
    document.body.classList.remove('bk2')
}

    render() {
        return (
            <React.Fragment>
                <BookList {...this.props}/>
            </React.Fragment>
        )
    }
}

export default BookMain