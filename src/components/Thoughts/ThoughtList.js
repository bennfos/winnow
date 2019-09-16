import React, { Component } from 'react-dom'
import ThoughtCard from "./ThoughtCard";
import AddThoughtModal from "./AddThoughtModal";
import './BookList.css'
import PageDataManager from "../Pages/PageDataManager";


class ThoughtList extends Component {
  //Defines initial state
  state = {
    thought: "",
    userId: parseInt(sessionStorage.getItem("credentials"))
  };

  //When component mounts, gets all news and sets state of news array with all existsing news items
  componentDidMount() {
    PageDataManager.getPage(this.props.pageId)
        .then(page => {
        this.setState({
          though: page.thought
        });
      });
    };


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
