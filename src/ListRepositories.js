import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import { List, ListItem } from "material-ui/List";
import ContentInbox from "material-ui/svg-icons/content/inbox";
import CircularProgress from "material-ui/CircularProgress";

class ListRepositoriesComponent extends Component {
  goTo(id) {
    const { history } = this.props;
    history.push(`/repo/${id}`);
  }

  renderContent() {
    const { repositories } = this.props;

    return () =>
      repositories.length ? (
        <List>
          {repositories.map(({ id, name }) => (
            <ListItem
              key={id}
              primaryText={name}
              leftIcon={<ContentInbox />}
              onClick={() => this.goTo(id)}
            />
          ))}
        </List>
      ) : (
        <CircularProgress />
      );
  }

  render() {
    const Content = this.renderContent();
    return <Content />;
  }
}
export const ListRepositories = withRouter(ListRepositoriesComponent);
