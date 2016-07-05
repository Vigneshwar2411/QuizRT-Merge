import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import AppBar from 'material-ui/AppBar';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MediaQuery from 'react-responsive';
import Subheader from 'material-ui/Subheader';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';
import CreateGroupDialog from './CreateGroupDialog';
import Group from './Group';
import FriendGroupList from './FriendGroupList';
import restUrl from '../../../restUrl';
import base64 from 'base-64';


export default class OnlineList extends React.Component{

    constructor(props){
      super(props);
      this.state = {
      popoverOpen: false,groupName: "",OnlineUsers:[], GroupData:[],
      view:'List' , username:'vigneshwar'
      };
    }

    componentDidMount(){
      console.log("==========Inside did mount=====");
      // var url ="http://localhost:8080/groups?users_like="+this.state.username;
      var username = (JSON.parse(base64.decode(localStorage.token.split('.')[1])).sub);
      username = username.split("@")[0];
      var request = $.ajax({
        url: restUrl + '/api/v1/chatlist/users/'+"Vigneshwar",
        type: 'GET',
        contentType: 'application/json',
        cache: false
      });
      request.done(function(data){
        console.log("=====inside success");
        console.log("====Inside client ",data.data);
        console.log("====Inside client ",data.data[0]);
        this.setState({OnlineUsers: data.data});
      }.bind(this));
      request.fail(function(){
          console.log("Inside fail============");
      }.bind(this));


      var request1 = $.ajax({
        url: restUrl + '/api/v1/chatlist/groups/'+"Vigneshwar",
        type: 'GET',
        contentType: 'application/json',
        cache: false
      });
      request1.done(function(data){
        console.log("=====inside success of groups");
        console.log("====Inside client groups ",data.data);
        console.log("====Inside client groups",data.data[0]);
        this.setState({GroupData: data.data});
      }.bind(this));
      request1.fail(function(){
          console.log("Inside request.fail of groups============");
      }.bind(this));

  }

    handleTouchTap(name) {
      var temp;
      var groupflag = false;
      var outerThis=this;
      this.state.GroupData.map(function(g){
        if(g.groupname===name){
            temp = g;
            groupflag = true;
        }
        console.log("onlinelist"+name);
        console.log("===groupflag",groupflag);
        outerThis.props.openChatBox(name,temp,outerThis.state.OnlineUsers,groupflag);

      })
    }

    popoverOpen(event) {
      event.preventDefault();
      this.setState({
        popoverOpen: true,
        anchorEl: event.currentTarget,
      });
    }

    popoverClose(){
      this.setState({
      popoverOpen: false,
    });
    }

    createGroup(){
        this.setState({
          view: "GroupData",popoverOpen: false,
        })
    };

    postGroupName(groupInfo){
      var groupDataPost ={
          groupname:groupInfo.groupname,
          groupavatar:"http://lorempixel.com/100/100",
          topicid:Math.ceil(Math.random()*1231),
          members:groupInfo.users
      };
      console.log(JSON.stringify(groupDataPost));
      console.log(groupDataPost);

      var request2 = $.ajax({
        url: restUrl + '/api/v1/chatlist/addgroup',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(groupDataPost)
      });
      request2.done(function(data){
        console.log("===Inside Onlinelist after posting group ",data);
        this.setState({GroupData: data.groupdata});
      }.bind(this));
      request2.fail(function(){
          console.log("Inside request.fail of postgroups============");
      }.bind(this));

      // $.ajax({
      //   url: "http://localhost:8080/groups",
      //   dataType: 'json',
      //   type: 'POST',
      //   data: groupDataPost,
      //   error: function(xhr, status, err) {
      //     console.error("http://localhost:8080/groups", status, err.toString());
      //   }.bind(this)
      // });
    }

    addGroup(groupname,groupusers){
      console.log("++++Inside Online list retrieved new group data ",groupname);
      console.log("++++Inside Online list retrieved new group data ",groupusers);
      this.postGroupName({"groupname":groupname , "users":groupusers});
      this.setState({
        groupName : '',view: "List",
      })
    }

    closeGroup(){
      this.popoverClose();
      this.setState({
        view: "List",
      })
    }

    closeDrawer(){
      this.setState({
        view:"List"
      })
      this.props.closeDrawer("Close Drawer");
    }

    render(){

      var outerThis = this;
      return(
            <div style={{height:'100vh', overflowY:'auto'}}>

            <MediaQuery query='(min-device-width: 800px)'>
              <MediaQuery query='(min-width: 800px)'>
                  <div className="row" style={{backgroundColor:'#3aaf85'}}>
                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                      <center style={{margin:19}}>
                        <span style={{cursor:'pointer'}}>
                          <FontIcon className="muidocs-icon-navigation-close" onTouchTap={this.closeDrawer.bind(outerThis) }/>
                        </span>
                      </center>
                    </div>
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                      <h2 style={{textAlign:'center'}}>Chat</h2>
                    </div>
                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <center style={{margin:19}}>
                      <span style={{cursor:'pointer'}}>
                        <FontIcon className="muidocs-icon-navigation-more_vert" onTouchTap={this.popoverOpen.bind(this)}/>
                      </span>
                    </center>
                      <Popover
                        open={this.state.popoverOpen}
                        anchorEl={this.state.anchorEl}
                        autoCloseWhenOffScreen={true}
                        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                        targetOrigin={{horizontal: 'left', vertical: 'top'}}
                        onRequestClose={this.popoverClose.bind(this)}
                      >
                      <Menu>
                        <MenuItem primaryText="New Group" leftIcon={<FontIcon className="muidocs-icon-social-group_add" />}
                        onTouchTap={this.createGroup.bind(this)}/>
                        <MenuItem primaryText="Settings" leftIcon={<FontIcon className="muidocs-icon-action-settings"/>}/>
                        <MenuItem primaryText="Sign out" leftIcon={<FontIcon className="muidocs-icon-action-power_settings_new"/>}/>
                      </Menu>
                      </Popover>
                    </div>
                  </div>
              <Divider />
            </MediaQuery>
            </MediaQuery>

            <MediaQuery query='(max-device-width: 800px)'>
              <MediaQuery query='(max-width: 800px)'>
                <div className="row">
                  <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                    <TextField hintText="Search Friend" />
                  </div>
                  <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                    <span style={{cursor:'pointer'}} >
                      <FontIcon className="muidocs-icon-social-group_add" style={{margin:19}} onTouchTap={this.createGroup.bind(this)}/>
                    </span>
                  </div>
                </div>
              </MediaQuery>
            </MediaQuery>

            <div>
              {this.state.view==="GroupData" ? <Group data={this.state.OnlineUsers} close={this.closeGroup.bind(this)} addGroup={this.addGroup.bind(this)} />
              : this.state.view==="List" ?
              <FriendGroupList usersData={this.state.OnlineUsers} groupData={this.state.GroupData} selectList={this.handleTouchTap.bind(this)}/> : null }
            </div>


            </div>

      )
    };
};
