import React from 'react';
import TextField from 'material-ui/TextField';

export default class EditProfile extends React.Component{
  constructor(){
    super();
  }

  handleName(event) {
    this.setState({name: event.target.value});
  };

  handleImg(event) {
    this.setState({avatarUrl: event.target.value});
  };

  handleAge(event) {
    this.setState({age: event.target.value});
  };

  handleCounry(event) {
      this.setState({country: event.target.value});
    };

  

  render(){
    return(
      <div>
      <TextField
        hintText="Name"
        floatingLabelText="Name"
        value={this.state.name}
        onChange={this.handleName.bind(this)}
      /><br />
        <TextField
          hintText="Avatar Image"
          floatingLabelText="Avatar Image"
          value={this.state.avatarUrl}
          onChange={this.handleImg.bind(this)}
        /><br />
        <TextField
          hintText="Age"
          floatingLabelText="Age"
          value={this.state.age}
          onChange={this.handleAge.bind(this)}
        /><br />
        <TextField
          hintText="Country"
          floatingLabelText="Country"
          value={this.state.country}
          onChange={this.handleCounry.bind(this)}
        /><br />
        <TextField
          hintText="Avatar Image"
          floatingLabelText="Avatar Image"
        /><br />
      </div>
    );
  }
}
