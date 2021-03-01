import React from 'react';
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
}
from '@material-ui/core';
import './userList.css';
// import fetchModel from '../../lib/fetchModelData';
import axios from 'axios';

/**
 * Define UserList, a React componment of CS142 project #5
 */
class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // usersList: window.cs142models.userListModel()
      usersList: []
    };
    this.userListShow = this.userListShow.bind(this);
  }

  componentDidMount() {
    var userModel = axios.get("/user/list");
    userModel.then((response) => {
      this.setState({usersList: response.data});
    }).catch((err) => {
      console.log(err);
    });
  }

  userListShow() {
    var finalUsers = new Array();
   
    for (var i = 0; i < this.state.usersList.length; i++) {
      var name = this.state.usersList[i].first_name + " " + this.state.usersList[i].last_name;
      var page = "http://localhost:3000/photo-share.html#/users/" + this.state.usersList[i]._id;
      finalUsers.push(<ListItem component="a" key={2*i} href={page}><ListItemText primary={name} /></ListItem>);
      finalUsers.push(<Divider key={2*i+1}/>);
    }

    var val = (
      <div>
        <Typography variant="body1">
          Select a username from below to see the user&apos;s details!
        </Typography>
        <List component="nav">
          {finalUsers}
        </List>
      </div>
    );
    return val; 
  }

  render() {
    return (
      <div>
        {this.userListShow()}
      </div>
    );
  }
}

export default UserList;
