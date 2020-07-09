import React from "react";

import { joinRoom, createRoom } from "./ApiRequests";
import { TextField } from "@material-ui/core"

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { code: "", name: "", roomError:false, nameError:false };

    this.handleCodeChange = this.handleCodeChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
  }

  handleCodeChange(event) {
    this.setState({ code: event.target.value });
    event.preventDefault();
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
    event.preventDefault();
  }

  handleSubmit(event) {
    event.preventDefault();
    joinRoom(this.state.code, this.state.name,
      (res) => {
        this.props.history.push(`/room/`, {
          roomId: this.state.code,
          memberId: this.state.name,
        });
      }, (error) => {
        if(error.response){
          switch (error.response.status) {
            case 404:
              this.setState({roomError:true})
              break;
            case 409:
              this.setState({nameError: true})
            default:
              break;
          }
        }
      }
    );
  }

  handleCreate(event) {
    event.preventDefault();
    createRoom(this.state.name, (res) => {
      this.props.history.push(`/room/`, {
        roomId: res.roomId,
        memberId: res.memberId,
      });
    });
  }

  render() {
    return (
      <div>
        <form>
          <label style={{ color: '#d0d0d0' }}>Name: </label>
          <TextField
            type="text"
            error={this.state.nameError}
            value={this.state.name}
            onChange={this.handleNameChange} 
            helperText={this.state.nameError ? "Name already in use" : ""}
            />
        </form>
        <button type="button" onClick={this.handleCreate}>
          {" "}
          Create room
        </button>
        <form onSubmit={this.handleSubmit}>
          <label style={{ color: '#d0d0d0' }}>Code:</label>
          <TextField
            error={this.state.roomError}
            type="text"
            value={this.state.code}
            onChange={this.handleCodeChange}
            helperText={this.state.roomError ? "Room doesn't exist" : "" }
            color="primary"
          />
          <input type="submit" value="enter room" />
        </form>
      </div>
    );
  }
}

export default Home;
