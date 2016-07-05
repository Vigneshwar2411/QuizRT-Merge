import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import loginForm from '../LoginForm'
import base64 from 'base-64';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import restUrl from '../../restUrl'

const style1 = {
  height: 90,
  width: 90,
  margin: 5,
  textAlign: 'center',
  display: 'inline-block',
};

const style = {
  borderLeft : 2,
  borderRight : 2,
  borderTop : 0,
  borderBottom : 0,
  borderStyle : 'solid',
  borderColor : 'lightgrey',
  textAlign : 'center',
  color : 'grey',
};

const styles = {
  textAlign : 'center',
  color : 'grey',
  borderRadius : 20,
  marginLeft : 20,
};

const styleCard = {
  borderRadius : 20,
};

export default class Profile extends React.Component{

  constructor(){
    super();
    this.state = {
      Profile: {
        username: { value: JSON.parse(base64.decode(localStorage.token.split('.')[1])).sub},
      },
      name: "",
      imageLink: "http://lorempixel.com/100/100/nature/",
      age: "",
      country: "",
      open: false,
      arr:[],
    }
  };

  handleUserName(event) {
    if(event.target.value != this.state.Profile.username.value){
    return{
      username: 'UserName cannot be changed'
    }
  }
  this.setState({username: event.target.value});
  };

  handleName(event) {
    this.setState({name: event.target.value});
  };

  handleImg(event) {
    this.setState({imageLink: event.target.value});
  };

  handleAge(event) {
    this.setState({age: event.target.value});
  };

  handleCounry(event) {
      this.setState({country: event.target.value});
    };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleSubmit(){

        var profileData = {
          username: this.state.username,
          name: this.state.name,
          imageLink: this.state.imageLink,
          age: this.state.age,
          country: this.state.country
        };

        var request = $.ajax({
          url: restUrl + '/api/v1/profile',
          type: 'PUT',
          data: JSON.stringify(profileData),
          contentType: 'application/json',
          headers: {JWT: localStorage.token}
        });
        request.done(function(data) {
          console.log(JSON.stringify(data));
        }.bind(this));
        request.fail(function() {
          this.setState({
            error: true
            });
          }.bind(this));

          this.setState({
            open:false
          })

        }

        addFriend(){

              var friendsData = {
                subject: this.state.Profile.username.value,
                relation: "sent friend request",
                object: "Preethi",
                };

              var request = $.ajax({
                url: restUrl + '/api/v1/friend',
                type: 'POST',
                data: JSON.stringify(friendsData),
                contentType: 'application/json',
                headers: {JWT: localStorage.token}
              });
              request.done(function(data) {
                console.log(JSON.stringify(data));
              }.bind(this));
              request.fail(function() {
                this.setState({
                  error: true
                  });
                }.bind(this));

                this.setState({
                  open:false
                })

              }

  componentDidMount(){
    console.log(this.state.Profile.username.value);

    var data1 = {
      username: "admin"
    };

    var request = $.ajax({
    url: restUrl + '/api/v1/profile',
    type: 'GET',
    data:JSON.stringify(data1),
    headers: {JWT: localStorage.token}
    });
    request.done(function(data) {
    console.log(JSON.stringify(data));
    this.setState({arr: data});
    }.bind(this));
    request.fail(function() {
    console.error('Profile err');
    }.bind(this));
  };

  render(){
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose.bind(this)}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleSubmit.bind(this)}
      />,
    ];
    return(
      <div>
      <Card>
          <div className="row">
            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
              <div style={{width: '100%', textAlign: 'center'}}>
                <Avatar size={80} style={{margin: '30px 0 30px'}}
                 src={this.state.arr[0].imageLink}
               />
              </div>
            </div>
            <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5" >
              <h2>{this.state.arr[0].name}</h2>
              <h4>Title</h4>
              <h5>{this.state.arr[0].age},{this.state.arr[0].country}</h5>
            </div>
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4" >
              {
                localStorage.token ? (
                  <div>
                  <RaisedButton
                  label="Edit Profile"
                  primary={true}
                  style={{marginTop: 50}}
                  icon={<FontIcon style={{cursor:'pointer'}} className="muidocs-icon-image-edit"/>}
                  onTouchTap={this.handleOpen}
                  />
                  <Dialog
                    title="Edit Profile"
                    actions={actions}
                    modal={true}
                    autoDetectWindowHeight={true}
                    autoScrollBodyContent={true}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                  >
                  <div >
                  <TextField
                    hintText="userName"
                    floatingLabelText="UserName"
                    fullWidth={true}
                    value={this.state.username}
                    onChange={this.handleUserName.bind(this)}
                  /><br />
                  <TextField
                    hintText="Name"
                    floatingLabelText="Name"
                    fullWidth={true}
                    value={this.state.name}
                    onChange={this.handleName.bind(this)}
                  /><br />
                    <TextField
                      hintText="Avatar Image"
                      floatingLabelText="Avatar Image"
                      fullWidth={true}
                      value={this.state.imageLink}
                      onChange={this.handleImg.bind(this)}
                    /><br />
                    <TextField
                      hintText="Age"
                      floatingLabelText="Age"
                      fullWidth={true}
                      value={this.state.age}
                      onChange={this.handleAge.bind(this)}
                    /><br />
                    <TextField
                      hintText="Country"
                      floatingLabelText="Country"
                      fullWidth={true}
                      value={this.state.country}
                      onChange={this.handleCounry.bind(this)}
                    /><br />
                    </div>
                  </Dialog>
                  </div>
                ): (
                  <RaisedButton
                      label="Add Friend"
                      primary={true}
                      style={{marginTop: 50}}
                      icon={<FontIcon style={{cursor:'pointer'}} className="muidocs-icon-social-person_add"/>}
                      onTouchTap={this.addFriend.bind(this)}
                  />
                )

              }
            </div>
          </div>
          <br/>
        <Divider />
        <br/>
        <CardMedia>
          <div className="row">
            <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7" style={styles} >
              <h2>Create your Own Tournament</h2>
              <RaisedButton label="Start Here" secondary={true}/>
            </div>
            <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2" style={styles}>
                <img style={styles} src="http://lorempixel.com/100/100/technics" />
            </div>
          </div>
        </CardMedia>
        <br/>
        <Divider />
        <br/>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" style={style1}>
          <h3>Followed Topics</h3>
          </div>
          <div className="row">
          <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3" style={styles}>
            <CardMedia >
              <img style={styleCard} src="http://lorempixel.com/100/100/animals/"/>
              <h4>Animals</h4>
            </CardMedia>
          </div>
          <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3" style={styles}>
            <CardMedia>
              <img style={styleCard} src="http://lorempixel.com/100/100/food/" />
              <h4>Food</h4>
            </CardMedia>
          </div>
          <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3" style={styles}>
            <CardMedia>
              <img style={styleCard} src="http://lorempixel.com/100/100/city/" />
              <h4>City</h4>
            </CardMedia>
         </div>
          </div>
          <br/>
          <Divider />
        </div>

        <br/>
        <Divider/>

        <div className="row">

        <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-lg-offset-1" style={styles}>
        <h4>Games</h4>
        <h2>{this.state.arr[0].totalGames}</h2>
        </div>
        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4" style={style}>
        <h4>Followers</h4>
        <h2>17</h2>
        </div>
        <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3" style={styles}>
        <h4>Following</h4>
        <h2>16</h2>
        </div>
        <Divider />
        </div>

        <Divider/>
      </Card>
      </div>
    );
  }
}
