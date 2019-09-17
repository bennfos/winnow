import React, { Component } from 'react'
import ThoughtCard from "./ThoughtCard";
import AddThoughtModal from "./AddThoughtModal";

import PageDataManager from "../Pages/PageDataManager";


class ThoughtList extends Component {
  //Defines initial state
  state = {
    thought: "",
    userId: parseInt(sessionStorage.getItem("credentials"))
  };

  //When component mounts, gets all news and sets state of news array with all existsing news items
  componentDidMount() {
    this.props.renderThought(this.props.pageId)
      }


    componentDidUpdate(prevProps) {
        console.log("thought component update")
        if (this.props.pageId !== prevProps.pageId) {
          this.props.renderThought(this.props.pageId)
          this.setState({
            thought: this.props.thought
          })
          console.log("thought in ThoughtList state after update: ", this.state.thought)
        }
      }


  render() {
    return (
      <React.Fragment>
        <div className="thoughtList__header">
          <div className="addthoughtModal">
            <h2>thoughts</h2>
            <AddThoughtModal {...this.props} />
          </div>
        </div>
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
