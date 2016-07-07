import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import {grey600,grey500, grey100, red900, teal500} from 'material-ui/styles/colors';
import Avatar from 'material-ui/Avatar';

const TitleStyle={
  fontSize:"1em",
    width:"100%",
  fontWeight:"1em"
}

const SubtitleStyle={
  fontSize:"0.8em",
    width:"100%"
}
var style1= {
  margin:"5px",

}
var imgStyle={
  height:"50%",
  margin:"auto"
}

const BtnStyle ={
  marginLeft:'35%'
}

var style1= {
  background:'#c6ecc6'
}

var cardDivStyle={
   margin:0,
}

var title1={
    paddingLeft:10,
    paddingTop:10,
    marginBottom:5
}
var title2={
  paddingLeft:10,
  marginTop:10,
  marginBottom:10,
  height:'30px'
}
var title3={
    textAlign:'center',
    margin:'auto',
    width:'60%',
    color:'white'
}
var title4={
     width:"30%",
     margin:'auto'
}

const style_fav={
    width:'5%',
    marginTop:10,
    marginBottom:10,
    float:'right',
}
const style_followers={
    width:'12%',
    marginTop:15,
    marginBottom:10,
    float:'right',
    fontWeight:'bold',
    fontSize:'small'
}
const style_favorite={
    width:'10%',
    marginTop:15,
    marginBottom:10,
    float:'right',
    fontWeight:'bold',
    fontSize:'small'
}
const iconStyles = {
  marginRight: 24,
  height:60,
  width:60,
}


  export default class AbtTopic extends React.Component {
    constructor(){
      super();
      this.state = {
            arr:[],
      }
    };


    componentDidMount(){

      var data1 = {
        topicId: cookie.load('topicId')
      };

      console.log(data1);


      var request = $.ajax({
      url: restUrl + '/api/v1/topic',
      type: 'GET',
      data:JSON.stringify(data1),
      headers: {JWT: localStorage.token}
      });
      request.done(function(data) {
      console.log(JSON.stringify(data));
      this.setState({arr: data});
      }.bind(this));
      request.fail(function() {
      console.error('err');
      }.bind(this));
    };

    render(){
      return(
        <div>
        <Card>
            <div className="row">
            <h4 style={title1}>
              {this.state.arr.topicName}
            </h4>
            <h5 style={title2} color={grey500}>{this.state.arr.topicDescription}</h5>

            <CardMedia overlay={
              <div>
              <CardTitle subtitle="Don't limit your Challenges, Challenge your Limits." subtitleColor="white" />
              </div>
             }>
              <img src={this.state.arr.topicIcon} />
            </CardMedia>
            <CardActions className="row">
              <div className="col-md-3 col-xs-3 col-lg-3 col-sm-3">
                <RaisedButton label="Play" secondary={true} style={BtnStyle} onClick={this.handleClike.bind(this,this.state.arr._id)} />
              </div>
              <div className="col-md-3 col-xs-3 col-lg-3 col-sm-3">
                <RaisedButton label="Follow" secondary={true} style={BtnStyle} onClick={this.handleFollow.bind(this,this.state.arr._id)} />
              </div>
              <div className="col-md-8 col-xs-8 col-lg-8 col-sm-8">

              </div>
             </CardActions>
              <Divider />
          </div>

          <Divider/>
        </Card>
        </div>
      );
    }

  }
