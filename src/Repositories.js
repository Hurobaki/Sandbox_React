import React, { Component, Fragment } from "react";
import { withRouter } from "react-router";
import { ListRepositories } from "./ListRepositories";
import Avatar from "material-ui/Avatar";
import Chip from "material-ui/Chip";

class RepositoriesComponent extends Component {
  state = {
    hasError: false,
    repositoriesList: [],
    userInfos: []
  };

  async getUserRepositories(nextProps) {
    try {
      console.log(nextProps);
      const query = await fetch(
        `https://api.github.com/users/${nextProps}/repos`
      );
      const result = await query.json();
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getUserInfos(nextProps) {
    try {
      console.log(nextProps);
      const query = await fetch(`https://api.github.com/users/${nextProps}`);
      const result = await query.json();
      return result;
    } catch (error) {
      throw error;
    }
  }

  async componentDidMount() {
    const { match: { params } } = this.props;
    this.setState({
      hasError: false
    });
    try {
      const repositories = await this.getUserRepositories(params.user);

      this.setState({
        repositoriesList: repositories
      });

      const infos = await this.getUserInfos(params.user);

      if (infos.message === "Not Found") {
        this.setState({
          hasError: true
        });
      } else {
        this.setState({
          userInfos: infos
        });
      }
    } catch (error) {
      console.log(error);
    }
  }



  render() {
    const { match: { params } } = this.props;
    const errorStyle = {
      color: "red"
    };

    const ChipStyle = {
      "margin-top": "20px"
    };

    const styles = {
      display: "flex",
      "align-items": "center",
      "flex-direction": "column"
    };

    if (this.state.hasError) {
      return (
        <div>
          <h1 style={errorStyle}>{params.user} not found</h1>
        </div>
      );
    }
    if (params.user !== "") {
      return (
        <Fragment>
          <div style={styles}>
            <Chip style={ChipStyle}>
              <Avatar src={this.state.userInfos.avatar_url} />
              {params.user}
            </Chip>
            <ListRepositories
              user={params.user}
              repositories={this.state.repositoriesList}
            />
          </div>
        </Fragment>
      );
    }
    return <div />;
  }
}

export const Repositories = withRouter(RepositoriesComponent);
