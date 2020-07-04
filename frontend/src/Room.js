import React from "react";
import SockJsClient from "react-stomp";

import Game from "./Game";
import { sendMessage } from "./ApiRequests";

class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      memberId: this.props.location.state.memberId,
      winner: "",
      roomId: this.props.location.state.roomId,
      amount: 1,
      text: "",
    };
    this.updateRoom = this.updateRoom.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  componentWillUnmount() {
    sendMessage(
      this.clientRef,
      `room/${this.state.roomId}/leave`,
      this.state.roomId
    );
  }

  updateRoom() {
    sendMessage(this.clientRef, `/room/${this.state.roomId}/update`, "Hello");
  }

  handleMessage(msg) {
    this.setState({
      winner: msg.winner,
      roomId: msg.roomId,
      amount: msg.memberAmount,
      text: msg.text,
    });
  }

  getWinner() {
    return this.state.winner !== -1
      ? `The winner is: ${this.state.winner}`
      : "";
  }

  resetGame() {
    sendMessage(this.clientRef, `/room/${this.state.roomId}/reset`, "Hello");
  }

  render() {
    return (
      <div>
        <h6>
          This is room "{this.state.roomId}" with {this.state.amount} member(s)
        </h6>
        <h3>{this.getWinner()}</h3>
        {this.state.text.length > 0 && ( // Render game after text is recieved
          <Game
            memberId={this.state.memberId}
            disabled={this.state.winner !== -1}
            text={this.state.text}
            clientRef={this.clientRef}
            id={this.state.roomId}
          />
        )}
        <button type="button" onClick={this.resetGame}> Play again</button>
        <SockJsClient
          url={"http://192.168.1.139:8080/endpoint"}
          topics={[`/topic/room/${this.state.roomId}`]}
          onMessage={this.handleMessage}
          ref={(client) => {
            this.clientRef = client;
          }}
          onConnect={this.updateRoom}
          debug={false}
        />
      </div>
    );
  }
}

export default Room;
