import React, { Component, Fragment } from "react";
import { render } from "react-dom";
import { SearchForm } from "./SearchForm";
import { Repositories } from "./Repositories";

class AppComponent extends Component {
  state = {
    userName: "",
    researchVisible: true,
    repositoriesVisible: false
  };

  selectUser = userName => {
    this.setState({
      userName,
      researchVisible: false,
      repositoriesVisible: true
    });
  };

  render() {
    const styles = {
      fontFamily: "sans-serif",
      textAlign: "center",
      display: "flex",
      "align-items": "center",
      "flex-direction": "column"
    };

    return (
      <Fragment>
        <div style={styles}>
          <SearchForm
            onUserSelect={this.selectUser}
            visible={this.state.researchVisible}
          />
        </div>
      </Fragment>
    );
  }
}

export const App = AppComponent;
