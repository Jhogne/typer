import React from "react";
import SockJsClient from "react-stomp";

import Game from "./Game";
import { sendMessage } from "./ApiRequests";
import { Typography, Button } from "@material-ui/core";
import { createMuiTheme } from '@material-ui/core/styles';
import PlayerProgress from './PlayerProgress';
import "./Room.css"

import Standings from "./Standings"

class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      memberId: this.props.location.state.memberId,
      winner: "",
      roomId: this.props.location.state.roomId,
      amount: 1,
      text: "",
      members: []
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
    console.log(msg);
    this.setState({
      winner: msg.winner,
      roomId: msg.roomId,
      amount: msg.memberAmount,
      text: msg.text,
      members: msg.members
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
    const players = this.state.members.map((player) =>
      <PlayerProgress key={player.id} you={player.id === this.state.memberId} id={player.id} progress={player.progress} wpm={player.wpm} />
    );
    return (
      <div className="root">
        <div className="content">
        <h6>
          This is room "{this.state.roomId}" with {this.state.amount} member(s)
        </h6>
        <Standings className="standings" players={this.state.members} myId={this.state.memberId}/>
        {this.state.text.length > 0 && ( // Render game after text is recieved
          <Game
            memberId={this.state.memberId}
            finished={this.state.winner !== -1}
            text={this.state.text}
            clientRef={this.clientRef}
            id={this.state.roomId}
          />
        )}
        <Typography variant="h4" className="result">{this.getWinner()}</Typography>
        {!this.state.winner && <Button className="reset" color="secondary" variant="outlined" onClick={this.resetGame}> Play again</Button>}
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
      </div>
    );
  }
}

export default Room;
