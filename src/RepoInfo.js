import React, { Component } from "react";

import Paper from "material-ui/Paper";
import Avatar from "material-ui/Avatar";
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';

const token = "d429fdccc548b0fd9fed2d5053748a82e77c4be7";

class RepoInfoComponent extends Component {
  state = {
    repo: null
  };

  async getRepoInfos() {
    try {
      const {match : {params}} = this.props;
      const infos = await fetch (`https://api.github.com/repositories/${params.id}?access_token=${token}`)
      return await infos.json()
    } catch (error) {
      throw error
    }
    
  }

  async componentDidMount() {
    try {
      const result = await this.getRepoInfos();
      console.log(result)
      this.setState({
        repo: result
      })
    } catch(error) {
      console.log(error)
    }
    
  }

  render() {
    const styles = {
      paper: {
        height: "100%",
        width: "100%",
        textAlign: 'center',
        display: 'inline-block',
        padding: "15px"
      },
      middle: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column"
      }, 
      testDiv: {
        width: "200px"
      }
    }

    const { repo } = this.state;

    if (repo) {
      return (
        <div>
          <Paper style={{...styles.paper, ...styles.middle}} zDepth={1}>
          <List>
            <ListItem
              disabled={true}
              leftAvatar={
                <Avatar src={repo.owner.avatar_url} />
              }
            >
              {repo.owner.login} <br />
              <small>{repo.owner.url}</small>
            </ListItem>
          </List>
          </Paper> 
        </div>
      );
    } else {
      return (
        <div> </div>
      )
    }
    
  }
}

export const RepoInfo = RepoInfoComponent;
