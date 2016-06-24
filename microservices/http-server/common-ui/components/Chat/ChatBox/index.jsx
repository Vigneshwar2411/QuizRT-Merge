import React from 'react';
import ChatList from './ChatList';
import TextField from 'material-ui/TextField';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ChatBoxAll from './ChatBoxAll';
import GroupInfo from '../GroupInfo';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import ChangeGroupName from '../ChangeGroupName';

var user='Vigneshwar';
export default class ChatBox extends React.Component{

  constructor(props){
    super(props);
    this.state={
      view:'chatbox',popoverOpen : false, GroupData:[], dialogOpen: false,
    }
  }

  componentDidMount(){
    this.setState({
      GroupData : this.props.GroupData,
      UserData : this.props.UserData,
      UserArray : JSON.parse(this.props.GroupData.users),
      titleName : this.props.Name
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

  viewGroupInfo(){
    console.log("Inside viewGroupInfo");
    this.setState({
      view:'groupinfo',popoverOpen: false,
    })
  }

  leaveGroup(){
    this.setState({
        dialogOpen:true ,popoverOpen :false,
    })
  }

  closeDialog(){
    this.setState({
      dialogOpen:false
    })
  }

  confirmLeave(){
    console.log(typeof(this.state.GroupData));
    var url = "http://localhost:8080/groups/"+this.state.GroupData.id;
    this.state.UserArray.splice(this.state.UserArray.indexOf(user),1);
    this.setState({
      UserArray : this.state.UserArray
    },function(){
      console.log(this.state.UserArray);
      $.ajax({
        url: url,
        dataType: 'json',
        type: 'PUT',
        data : {groupname : this.state.GroupData.groupname ,
                users : JSON.stringify(this.state.UserArray),
                }
      });
    })
    this.setState({
      dialogOpen : false
    })
  }

  changeName(){
    this.setState({
      view: 'changename' ,popoverOpen: false,
    })
  }

  closeChangeGroup(text){
    console.log("inside close change group");
    this.setState({
      view: 'chatbox',
    })
  }


  render(){

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.closeDialog.bind(this)}
      />,
      <FlatButton
        label="Leave"
        primary={true}
        onTouchTap={this.confirmLeave.bind(this)}
      />,
    ];
    var outerThis=this;
    return(
      <div>
        <div>
            <Dialog
            actions={actions}
            modal={false}
            open={this.state.dialogOpen}
            onRequestClose={this.closeDialog.bind(this)}
            >
            Are you Sure, You Want Leave this Group?
          </Dialog>
        </div>
      <div style={{height:'100vh'}}>
        <div className="row" style={{height:'10%'}}>
              <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3" >
                <div style={{marginLeft:20,marginTop:19}}><span style={{cursor:'pointer'}}>
                  <FontIcon className="muidocs-icon-navigation-arrow_back" onTouchTap={this.props.closeChatBox}/>
                </span></div>
              </div>
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <h3 style={{textAlign:'center'}}>{this.props.Name}</h3>
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
                  <MenuItem primaryText="Group Info" leftIcon={<FontIcon className="muidocs-icon-action-people_outline"/>}
                  onTouchTap={outerThis.viewGroupInfo.bind(outerThis)}/>
                  <MenuItem primaryText="Leave Group" leftIcon={<FontIcon className="muidocs-icon-action-exit_to_app"/>}
                  onTouchTap={outerThis.leaveGroup.bind(outerThis)}/>
                  <MenuItem primaryText="Change Picture" leftIcon={<FontIcon className="muidocs-icon-av-album"/>}/>
                  <MenuItem primaryText="Change Group Name" leftIcon={<FontIcon className="muidocs-icon-image-edit"/>}
                  onTouchTap={outerThis.changeName.bind(outerThis)}/>
                </Menu>
                </Popover>
              </div>
        </div>
        <Divider />
        <div >
          {this.state.view==="chatbox" ?
              <ChatBoxAll /> : this.state.view==="groupinfo" ?
              <GroupInfo GroupData={this.state.GroupData} UserData={this.state.UserData}/> :
              this.state.view==="changename"?
              <ChangeGroupName GroupData={this.state.GroupData} close={this.closeChangeGroup.bind(this)}/> : null
          }

        </div>
      </div>
    </div>
    )
  }


};
