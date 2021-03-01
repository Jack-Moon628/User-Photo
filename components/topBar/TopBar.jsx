import React from 'react' 
import {
  AppBar, Toolbar, Typography
} from '@material-ui/core';
import { withRouter } from "react-router";
import './TopBar.css';
import axios from 'axios';


/**
 * Define TopBar, a React componment of CS142 project #5
 */
class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Raksh N.",
      version: "",
      _id: 0,
      userObj: {}
    };
    this.topRight = this.topRight.bind(this);
  }

  componentDidMount() {
    var versionInfo = axios.get("/test/info");
    versionInfo.then((response) => {
      var version = response.data.__v;
      this.setState({version: version});
    }).catch((err) => {
      console.log(err);
    });
  }

  componentDidUpdate() {
    var URL = window.location.href;
    var user_id = /[^/]*$/.exec(URL)[0];

    if (user_id !== undefined) {
      var userDetails = axios.get("/user/" + user_id);
      userDetails.then((response) => {
        if (user_id !== this.state._id) {
          var userModel = {
            _id: response.data._id,
            first_name: response.data.first_name,
            last_name: response.data.last_name,
            location: response.data.location,
            description: response.data.description,
            occupation: response.data.occupation
          };
          this.setState({
            userObj: userModel,
            _id: user_id
          });
        }
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  topRight() {

    var onUserPage = (window.location.href.indexOf("/users/") > -1);
    var onPhotosPage = (window.location.href.indexOf("/photos/") > -1);
    var toDisplay;
    var userInfo;
    if (onUserPage) {
      userInfo = this.state.userObj;
      if (userInfo !== null) {
        toDisplay = userInfo.first_name + " " + userInfo.last_name;
      } else {
        toDisplay = "";
      }
    } else if (onPhotosPage) {
      userInfo = this.state.userObj;
      if (userInfo !== null) {
        toDisplay = "Photos of " + userInfo.first_name + " " + userInfo.last_name;
      } else {
        toDisplay = "";
      }
    } else {
      toDisplay = "";
    }
    return "toDisplay";
  }

  render() {
    return (
      <AppBar className="cs142-topbar-appBar" position="absolute">
        <Toolbar>
          <Typography variant="h5" color="inherit">
              {this.state.name} (Version: {this.state.version})
          </Typography>
          <Typography variant="subtitle1" color="inherit" align="right" className="title">
              {this.topRight()}
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withRouter(TopBar);
