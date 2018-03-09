import React, { Component } from "react";

class RepoInfoComponent extends Component {
  state = {
    repoOwner: "",
    repoName: ""
  };

  async componentDidMount() {
    // use this url to fetch https://api.github.com/repositories/89458933
  }

  render() {
    return (
      <div>
        <h1> Repo info </h1>
      </div>
    );
  }
}

export const RepoInfo = RepoInfoComponent;
