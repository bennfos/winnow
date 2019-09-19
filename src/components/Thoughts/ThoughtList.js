import React, { Component } from 'react'
import ThoughtCard from "./ThoughtCard";
import { Label } from 'reactstrap'
import './Thoughts.css'


class ThoughtList extends Component {
  //Defines initial state
  state = {
    thought: "",
    userId: parseInt(sessionStorage.getItem("credentials"))
  };

//When component receives new pageId in props (i.e., page is changed) from PageMain, update state in PageMain to cause a rerender of ThoughtList
    componentDidUpdate(prevProps) {
        if (this.props.pageId !== prevProps.pageId) {
          this.props.renderThought(this.props.pageId)
        //set state of thought with thought in props. This helps keep input field consistent with what is on page when user wants to add or edit thought.
          this.setState({
            thought: this.props.thought
          })

        }
      }


  render() {
    return (
      <React.Fragment>
        <Label>thought</Label>
        <div className="thoughtCard__container">
            <ThoughtCard
              {...this.props}
            />
        </div>
      </React.Fragment>
    );
  }
}

export default ThoughtList;
