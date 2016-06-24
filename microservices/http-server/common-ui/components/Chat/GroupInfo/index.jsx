import React from 'react';
import TextField from 'material-ui/TextField';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import {List, ListItem} from 'material-ui/List';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';


export default class GroupInfo extends React.Component{

constructor(props){
  super(props);
  this.state = ({
    userInfo:[],
  })
}

componentDidMount(){
  var outerThis=this;
  console.log(typeof(this.props.GroupData));
  console.log(this.props.GroupData);
  var temp =[];
  JSON.parse(this.props.GroupData.users).map(function(u){
    outerThis.props.UserData.map(function(d){
      if(u===d.Name){
        console.log(d.Name);
        console.log(d.img);
        temp= temp.concat({name:d.Name , img:d.img})
      }
    })
  })
  console.log(temp);
  this.setState({
    userInfo : temp
  })
}

render(){
  var outerThis=this;
  return(
      <div>
        <div className="row">
        <div className="col-lg-12 col-xs-12 col-sm-12 col-md-12">
          <List>
              <Subheader>Members</Subheader>
                {this.state.userInfo.map(function(u){
                  return(
                    <ListItem
                      primaryText={u.name}
                      leftAvatar={<Avatar src={u.img} />}
                      rightIcon={<FontIcon className="muidocs-icon-social-person"/>}
                      />
                  )
                })}
          </List>
          </div>
        </div>
      </div>
  )
}

};
