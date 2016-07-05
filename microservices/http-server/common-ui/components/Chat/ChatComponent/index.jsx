import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import ChatBox from '../ChatBox';
import {blue300, red500, greenA200} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import OnlineList from '../OnlineList';


export default class ChatComponent extends React.Component{

  constructor(props) {
    super(props);
    this.state ={view:'OnlineList'}
  }

 openChatBox(name,GroupData,UserData,groupFlag) {
   console.log("Chat component"+name);
   this.setState({user:name , GroupData: GroupData , UserData : UserData ,groupFlag:groupFlag,view:'ChatBox'});
 }
 closeChatBox(){
    this.setState({view:'OnlineList'});
 }

 closeDrawer(text){
   this.props.onHandleClose("close");
 }

  render(){
    return(
        <div>
        {this.state.view=="OnlineList"?<OnlineList closeDrawer={this.closeDrawer.bind(this)} openChatBox={this.openChatBox.bind(this)}/>
        :this.state.view=="ChatBox"?<ChatBox closeChatBox={this.closeChatBox.bind(this)}
         Name={this.state.user} GroupData={this.state.GroupData} UserData={this.state.UserData} GroupFlag={this.state.groupFlag}/> : null}
        </div>
    )
  }

};
