import React, { Component } from "react";
import PageCard from "./PageCard";
import PageDataManager from "./PageDataManager";
import AddPageModal from "./AddPageModal.js";


class PageList extends Component {
  //Defines initial state
  state = {
    pages: [],
    userId: parseInt(sessionStorage.getItem("credentials"))
  };

  //When component mounts, gets all news and sets state of news array with all existsing news items
  componentDidMount() {
    PageDataManager.getAllPages(this.state.userId).then(pages => {

        this.setState({
          pages: pages
        });
      });
    };

  // Called in NewsItemNewModal (child component) to post a new object to database and update state
  addPage = pageObject => {
    return PageDataManager.postPage(pageObject)
        .then(() => {
            PageDataManager.getAllPages(this.state.userId)
                .then(pages => {
                    this.setState({
                        pages: pages
          });
        });
      });
    };


  // Called in NewsCard(child component) to delete object from database and update state
  removePage = id => {
    PageDataManager.deletePage(id)
        .then(() => {
            PageDataManager.getAllPages(this.state.userId)
                .then(pages => {
          this.setState({
            pages: pages
          });
        });
      });
  };

  // Called in NewEditModal (child component) to post edited object to database and update state
  postEditedPage = id => {
    return PageDataManager.editPage(id).then(() => {
      PageDataManager.getAllPages(this.state.userId)
        .then(pages => {
          this.setState({
            pages: pages
          });
        });
      });
  };

  render() {
    return (
      <React.Fragment>
        <AddPageModal {...this.props} addPage={this.addPage} />
        <div className="pageCards__container">
          {this.state.pages.map(page => (
            <PageCard
              key={page.id}
              page={page}
              removePage={this.removePage}
              postEditedPage={this.postEditedPage}
              {...this.props}
            />
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default PageList;
