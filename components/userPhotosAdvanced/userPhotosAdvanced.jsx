import React from 'react';
import {
  Typography,
} from '@material-ui/core';
import './userPhotosAdvanced.css';
import axios from 'axios';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';

/**
 * Define UserPhotos, a React componment of CS142 project #5
 */
class UserPhotosAdvanced extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photosDetail: [],
      current: 0,
      length: 0
    };
    this.getDataPhotos = this.getDataPhotos.bind(this, false);
    this.nextSlide = this.nextSlide.bind(this);
    this.prevSlide = this.prevSlide.bind(this);
    this.setCurrent = this.setCurrent.bind(this);
    // this.showPhotos = this.showPhotos.bind(this);    
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
      this.setState({"length": photosIdArr.length})
    }).catch((error) => {
      console.log(error);
    });
  }

  nextSlide = () => {
    if((this.state.length - 1) !== this.state.current){
      this.setCurrent(this.state.current === this.state.length - 1 ? 0 : this.state.current + 1);
    }
  }

  prevSlide = () => {
    if(0 !== this.state.current){
      this.setCurrent(this.state.current === 0 ? this.state.length - 1 : this.state.current - 1);
    }
  }

  setCurrent(current){
    this.setState({"current" : current});
  }

  getDataPhotos(){
    var photosRender = [];
    var userPhotos = this.state.photosDetail;
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
            <div className={`userImg${i === this.state.current ? ' slide active' : 'slide'}`} key={i} >
              {i === this.state.current && (
                <img src={imgSrc} alt='travel image' width="350" height="250" className='userImg image' />
              )}
              {i === this.state.current && (<div className="img-comments">
                <Typography component="p">Created on {creationStats}</Typography>
                <i><b><h3>Comments:</h3></b></i>
                <div>
                  {comments}
                </div>
              </div>)}
            </div>);
      }
    }        
    return photosRender;
  }

  render() {
    return (
      <section className='slider'>
        <FaArrowAltCircleLeft className={`left-arrow ${this.state.current} ${0 === this.state.current ? 'arrow-disabled' : ''}`} onClick={this.prevSlide} />
        <FaArrowAltCircleRight className={`right-arrow ${this.state.length} ${(this.state.length == 0 || (this.state.length-1) === this.state.current) ? 'arrow-disabled' : ''}`} onClick={this.nextSlide} />
        <div>
          {this.getDataPhotos()}
        </div>
       
      </section>
    );
  }
}

export default UserPhotosAdvanced;
