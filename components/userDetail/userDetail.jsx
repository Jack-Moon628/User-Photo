import React from 'react';
import './userDetail.css';
import axios from 'axios';


/**
 * Define UserDetail, a React componment of CS142 project #5
 */
class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: 0,
      userObj: {}
    };
    this.showUserDetails = this.showUserDetails.bind(this);
  }

  componentDidMount() {
    var user_id = this.props.match.params.userId;
    var userDetailModel = axios.get("/user/" + user_id);
    userDetailModel.then((response) => {
      var userInfoModel = {
        _id: response.data._id,
        first_name: response.data.first_name,
        last_name: response.data.last_name,
        location: response.data.location,
        description: response.data.description,
        occupation: response.data.occupation
      };
      this.setState({userObj: userInfoModel, _id: user_id});
    }).catch((err) => {
      console.log(err);
    });
  }

  componentDidUpdate() {
    var user_id = this.props.match.params.userId;
    var userDetailModel = axios.get("/user/" + user_id);
    userDetailModel.then((response) => {
      if (user_id !== this.state._id) {
        var userInfoModel = {
          _id: response.data._id,
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          location: response.data.location,
          description: response.data.description,
          occupation: response.data.occupation
        };
        this.setState({userObj: userInfoModel, _id: user_id});
      }
    }).catch((err) => {
      console.log(err);
    });
  }
  
  showUserDetails () {
    console.log("sdfasdf");
    // var user_id = this.props.match.params.userId;
    // var userInfo = window.cs142models.userModel(user_id);
    var userInfo = this.state.userObj;
    var pageLink = "http://localhost:3000/photo-share.html#/photos/" + userInfo._id;
    var displayName = userInfo.last_name + "'s"
    var displayNameFirst = userInfo.first_name + "'s"

    var toShow = (
      <div>
                <h2>
          {userInfo.first_name} {displayName} details:
        </h2>
        <div className="card">

          <p>
            <a className="button" href={pageLink}>See {displayNameFirst} photos! </a>
          </p>
        </div>
      </div>
    );
    return toShow;
  }

  render() {
    return (
      // <Typography variant="body1">
      //   This should be the UserDetail view of the PhotoShare app. Since
      //   it is invoked from React Router the params from the route will be
      //   in property match. So this should show details of user:
      //   {this.props.match.params.userId}. You can fetch the model for the
      //   user from window.cs142models.userModel(userId).
      // </Typography>
      <div>
        {this.showUserDetails()}
      </div>
    );
  }
}

export default UserDetail;
