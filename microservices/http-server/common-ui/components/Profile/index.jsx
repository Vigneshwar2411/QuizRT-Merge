import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import loginForm from '../LoginForm'
import base64 from 'base-64';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';

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

export default class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      Profile: {
        username: { value: JSON.parse(base64.decode(localStorage.token.split('.')[1])).sub }
        }
    }
    };

    componentDidMount(){
      var request= $.ajax({
      url: restUrl + '/api/v1/profile/myprofile',
      type: 'GET',
    });
    request.done(function(data) {
      console.log(JSON.stringify(data));
      this.setState({
        arr: data
      });
    }.bind(this));
    request.fail(function() {
      console.error('Profile error');
    }.bind(this));
  }

    }

    addAsFriend(){
      // $.ajax({
      //   url: restUrl + '/api/v1/addFriend',
      //   type: 'POST',
      //   data: JSON.stringify(Profile),
      //   contentType: 'application/json'
      // });
      }

  render() {
    return (
      <div>
          <Card>
              <div className="row">
                <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                  <div style={{width: '100%', textAlign: 'center'}}>
                    <IconMenu
                      <Avatar size={80} style={{margin: '30px 0 30px'}}>{this.state.profile.imageLink}</Avatar>
                        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                        targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    />
                      <MenuItem primaryText="Change Avatar" onTouchTap={this.handleChange.bind(this)}/>
                    </IconMenu>
                  </div>
                </div>
                  <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                  <h2>{this.state.Profile.username.value}</h2>
                  <h5>Title</h5>
                </div>
                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4" >
                  <RaisedButton
                    label="Add Friend"
                    primary={true}
                    style={{marginTop: 50}}
                    icon={<FontIcon style={{cursor:'pointer'}} className="muidocs-icon-social-person_add" onTouchTap={this.addAsFriend.bind(this)}/>}
                  />
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
                    <img style={styles} src="http://lorempixel.com/100/100/nature/" />
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
                  <img style={styleCard} src="http://lorempixel.com/100/100/nature/"/>
                  <h4>name</h4>
                </CardMedia>
              </div>
              <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3" style={styles}>
                <CardMedia>
                  <img style={styleCard} src="http://lorempixel.com/100/100/nature/" />
                  <h4>name</h4>
                </CardMedia>
              </div>
              <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3" style={styles}>
                <CardMedia>
                  <img style={styleCard} src="http://lorempixel.com/100/100/nature/" />
                  <h4>name</h4>
                </CardMedia>
             </div>
              </div>
              <br/>
              <Divider />
            </div>

            <br/>
            <Divider/>

            <div className="row">

            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4" style={styles}>
            <h4>Games</h4>
            <h2>1</h2>
            </div>
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4" style={styles}>
            <h4>Followers</h4>
            <h2>17</h2>
            </div>
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4" style={styles}>
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
