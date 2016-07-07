import React from 'react';
import FlatButton from 'material-ui/FlatButton';
//import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';

export default class Post extends React.Component{

  constructor(props){
    super(props);
    this.state = {value:""}
  }
  handleValueChange(e) {
    this.setState({value: e.target.value});
  }
  // handling comments submit

  handleKeyDown(e) {
    if(e.keyCode === 13) {
      this.props.submitComment(this.state.value,this.props.postData._id);
        this.setState({value:""});
    }
  }

handleDelete(){
 this.props.deletePost(this.props.postData) ;

}

  render() {
    var key =1;
    var iconStyle = {marginLeft:30};
    var cardStyle = {boxShadow:'rgba(0, 0, 0, 0.117647) 0px 1px 6px',boxShadow:'rgba(0, 0, 0, 0.117647) 0px 1px 4px',zIndex :1,marginTop:20}
    //console.log("post...."+this.props.comments);

    var comments = this.props.comments.map(function(comment) {
      //console.log("ccc"+comment);
      return (
             <div style ={{boxShadow:'rgba(0, 0, 0, 0.117647) 0px 1px 6px',zIndex :1,backgroundColor:"#f3f4f5",marginTop:10}}>
             <div>
               <span><Avatar
                    src="http://lorempixel.com/100/100/nature/"
                    size={30}
                />
                <p style={{display:"inline",paddingLeft:10}}>Sandeep</p>

             </span>

           <p>{comment.cdata}</p>               {/*comment*/}
       </div>
        <div>
          <span style={iconStyle}><FontIcon className="muidocs-icon-action-thumb-up"/></span>

       </div>
        </div>
    )

    });

    return (
       <div>
       <div style={cardStyle}>
            <div>
                <span><Avatar
                      src={this.props.postData.imgUrl}
                      size={40}
                    />
                    <p style={{display:"inline",paddingLeft:10}}>{this.props.postData.user}</p>

               </span>
               <span style={{float:"right"}}><FontIcon className="muidocs-icon-content-clear" onTouchTap={this.handleDelete.bind(this)}/></span>
            <div>
            <p>{this.props.postData.text}</p>               {/*post*/}
            </div>

          </div>
          <div>
            <span style={iconStyle}><FontIcon className="muidocs-icon-action-thumb-up"/></span>

          </div>
             <div  style={{marginLeft:100}}>
              {comments}
             </div>
          <div style={{boxShadow:'rgba(0, 0, 0, 0.117647) 0px 1px 6px',marginLeft:100}}>
              <div style={{border:"2px",color:"black",paddingTop:10}}>
              <TextField
               fullWidth={true}
               hintText="Comment"
               value={this.state.value}
               onKeyDown={this.handleKeyDown.bind(this)}
               onChange={this.handleValueChange.bind(this)}
               id = "comment"

             />
             </div>
          </div>
          </div>
       </div>
    );
  }
}
