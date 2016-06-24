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

const style = {
  paddingTop:40,
  marginTop:20,
  height:"100%"
}

const chatListStyle ={
  height:'80%',
  overflowY:'auto'
}

export default class ChatBoxAll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {messages : [],msg: "" , focusmsg:"" ,roomId:"ChatRoom" };
    //console.log(this.props.UserName);


  }

  handleChat(e){
    this.setState({msg: e.target.value});
  }

  submitForm(e){
    e.preventDefault();
    this.setState({msg : ''});
  }


  render() {
    return (
          <div style={{height:'100vh'}}>
            <div className="row" style={{height:'80%' , overflowY:'auto'}}>
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <ChatList data={this.state.messages} />
              </div>
            </div>
            <div className="row" style={{height:'20%'}}>
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <form onSubmit={this.submitForm.bind(this)}>
                  <TextField
                  hintText="Message"
                  value={this.state.msg}
                  onChange={this.handleChat.bind(this)}
                  />
                  </form>
              </div>
            </div>
          </div>
    );
  }
}
