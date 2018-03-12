import React, { Component, Fragment } from "react";
import { withRouter } from "react-router";
import { ListRepositories } from "./ListRepositories";
import { compose } from "redux";
import { connect } from "react-redux";
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

  componentWillReceiveProps({ search: nextSearch }) {
    const { search } = this.props;
    if (search !== nextSearch) {
      this.getUserRepositories(nextSearch);
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

    const styles = {
      errorStyle: {
        color: "red"
      },
      chipStyle: {
        "margin-top": "20px"
      },
      display: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column"
      }
    }

    if (this.state.hasError) {
      return (
        <div>
          <h1 style={styles.errorStyle}>{params.user} not found</h1>
        </div>
      );
    }
    if (params.user !== "") {
      return (
        <Fragment>
          <div style={styles.display}>
            <Chip style={styles.chipStyle}>
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

const mapStateToProps = state => ({
  search: state.search
});

export const Repositories = compose(connect(mapStateToProps), withRouter)(
  RepositoriesComponent
);
