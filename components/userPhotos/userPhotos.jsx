import React from 'react';
import {
  Typography,
} from '@material-ui/core';
import './userPhotos.css';
import axios from 'axios';


/**
 * Define UserPhotos, a React componment of CS142 project #5
 */
class UserPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photosDetail: [],
    };
    this.showPhotos = this.showPhotos.bind(this);
  }
  
  componentDidMount() {
    var user_id = this.props.match.params.userId;
    var photos = axios.get("/photosOfUser/" + user_id);
    photos.then((response) => {
      var photosModel = response.data;
      this.setState({photosDetail: photosModel});
      var photosIdArr = [];
      for (var i = 0; i < this.state.photosDetail.length; i++) {
        photosIdArr.push(this.state.photosDetail[i]._id);
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  showPhotos() {
    var photosRender = [];
    // var user_id = this.props.match.params.userId;
    // var userPhotos = window.cs142models.photoOfUserModel(user_id);
    var userPhotos = this.state.photosDetail;
    console.log(userPhotos);
    if (userPhotos.length !== 0) {
      for (var i = 0; i < userPhotos.length; i++) {
        var imgSrc = "/images/" + userPhotos[i].file_name;
        var creationStats = userPhotos[i].date_time;
        var comments = [];

        if (userPhotos[i].comments !== undefined && userPhotos[i].comments.length !== 0) {
          for (var j = 0; j < userPhotos[i].comments.length; j++) {
            var linkToUser = "http://localhost:3000/photo-share.html#/users/" + userPhotos[i].comments[j].user._id;
            comments.push(<span>Comment by <strong>  
                          <a href={linkToUser}>
              {userPhotos[i].comments[j].user.first_name + ' ' + userPhotos[i].comments[j].user.last_name}
              </a></strong>: <i>{userPhotos[i].comments[j].comment} </i></span>);
            comments.push(<br/>);
            comments.push(<span>Date and time: {userPhotos[i].comments[j].date_time}</span>);
            comments.push(<br/>);
            comments.push(<br/>);
          }
        } else {
          var k = 0;
          comments.push(<span>No comments yet!</span>);
          comments.push(<br/>);
          comments.push(<br/>);
          console.log(k);
          k++;
        }
        photosRender.push(
          <div>
            <img className="userImg" src={imgSrc} width="350" height="250" />
            <div>
          <Typography component="p">Created on {creationStats}</Typography>
              <i><b><h3>Comments:</h3></b></i>
              <div>
                {comments}
              </div>
            </div>
          </div>);
      }
    } else {
      photosRender.push(<div>There are no photos for this user yet!</div>);
    }
    return photosRender;
  }

  render() {
    return (
      <div>
        {this.showPhotos()}
      </div>

    );
  }
}

export default UserPhotos;
