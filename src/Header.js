import React, { Component } from "react";
import { withRouter } from "react-router";

import AppBar from "material-ui/AppBar";
import { Drawer, MenuItem } from "material-ui";

class HeaderComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleClose = () => this.setState({open: false});

  handleToggle = () => {
    this.setState((prevState) => ({
      open: !prevState.open
    }))
  }

  goToIndex = () => {
    const { history } = this.props;
    history.push(`/`);
  }

  render() {
    return (
      <div>
        <AppBar
          title="GitHub Dashboard Sample"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onLeftIconButtonClick = { this.handleToggle }
        />
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <MenuItem onClick={() => { this.handleClose(); this.goToIndex()}}>Search User</MenuItem>
        </Drawer>
      </div>
    );
  }
}
export const Header = withRouter(HeaderComponent);
