import React, { Component } from 'react'
import ThoughtCard from "./ThoughtCard";
import AddThoughtModal from "./AddThoughtModal";
import './Thoughts.css'


class ThoughtList extends Component {
  //Defines initial state
  state = {
    thought: "",
    userId: parseInt(sessionStorage.getItem("credentials"))
  };

 
    componentDidUpdate(prevProps) {

        if (this.props.pageId !== prevProps.pageId) {
          this.props.renderThought(this.props.pageId)
          this.setState({
            thought: this.props.thought
          })

        }
      }


  render() {
    return (
      <React.Fragment>
        <AddThoughtModal {...this.props} />
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
