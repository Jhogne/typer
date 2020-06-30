import React from "react";

import { joinRoom, createRoom } from "./ApiRequests";

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { code: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
  }

  handleChange(event) {
    this.setState({ code: event.target.value });
    event.preventDefault();
  }

  handleSubmit(event) {
    event.preventDefault();
    joinRoom(this.state.code, (res) => {
      this.props.history.push(`/room/`, {
        roomId: this.state.code,
        memberId: res,
      });
    });
  }

  handleCreate(event) {
    event.preventDefault();
    createRoom((res) => {
      this.props.history.push(`/room/`, {
        roomId: res.roomId,
        memberId: res.memberId,
      });
    });
  }

  render() {
    return (
      <div>
        <button type="button" onClick={this.handleCreate}>
          {" "}
          Create room
        </button>
        <form onSubmit={this.handleSubmit}>
          <label>Code:</label>
          <input
            type="text"
            value={this.state.code}
            onChange={this.handleChange}
          />
          <input type="submit" value="enter room" />
        </form>
      </div>
    );
  }
}

export default Home;
