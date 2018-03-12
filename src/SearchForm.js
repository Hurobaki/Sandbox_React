import React, { Fragment, Component } from "react";
import { withRouter } from "react-router";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import { compose } from "redux";
import { connect } from "react-redux";
import { setSearch } from "./actions";

class SearchFormComponent extends Component {
  state = {
    value: ""
  };

  onChange = ({ target: { value } }) => {
    this.setState({ value: value });
  };

  handleKeyPress = (event) => {
    if(event.key === 'Enter') {
      this.goToRepos();
    }
  }

  goToRepos = () => {
    const { history, updateSearch } = this.props;
    const { value } = this.state;
    updateSearch(value);
    history.push(`/repositories/${value}`);
  };

  render() {
    const { value } = this.state;

    const buttonStyle = {
      "margin-bottom": "20px"
    };

    return (
      <Fragment>
        <TextField
          name="search"
          value={value}
          onChange={this.onChange}
          onKeyPress={this.handleKeyPress}
          hintText="Username"
        />
        <p>{value}</p>
        <RaisedButton
          label="Search"
          secondary={true}
          onClick={this.goToRepos}
          style={buttonStyle}
        />
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateSearch: searchTerm => dispatch(setSearch(searchTerm))
});

export const SearchForm = compose(
  connect(null, mapDispatchToProps),
  withRouter
)(SearchFormComponent);
