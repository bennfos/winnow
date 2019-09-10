import React, { Component } from 'react'
import PageList from './PageList'
import PageDay from './PageDay'
import PageSelect from './PageSelect'

class PageMain extends Component {






    render() {
        return (
            <React.Fragment>
                <PageList {...this.props}/>
            </React.Fragment>
        )
    }
}


export default PageMain