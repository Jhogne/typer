import React from "react";
import SockJsClient from "react-stomp";

import Game from "./Game";
import { sendMessage } from "./ApiRequests";
import { Typography, Button } from "@material-ui/core";
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
      members: [],
      standings: [],
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
      members: msg.members,
      standings: msg.standings
    });
  }

  getMyWpm() {
    var mywpm = 0;
    this.state.members.forEach( player => {
      if(player.id === this.state.memberId) {
        mywpm = player.wpm;
      }
    })
    return mywpm;
  }

  resetGame() {
    console.log(this.getMyWpm);
    sendMessage(this.clientRef, `/room/${this.state.roomId}/postState`, {playerId:this.state.memberId, completed:this.state.text, wpm:this.getMyWpm(), ready:true});
  }

  getPlacement() {
    return this.state.standings.includes(this.state.memberId) ? 
       this.prettyPlacement(this.state.standings.indexOf(this.state.memberId)) 
       : "";
  }

  prettyPlacement(number) {
    switch(number) {
      case 0:
        return "Winner"
      case 1:
        return "Second place"
      case 2:
        return "Third place"
      case 3:
        return "Fourth place"
      default:
        return ""
    }
  }

  getReady() {
    var ready = []
    this.state.members.forEach(p => {
      if(p.ready) {
        ready.push(p.id)
      }
    });
    
    return ready;
  }

  render() {
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
            finished={this.state.standings.includes(this.state.memberId)}
            text={this.state.text}
            clientRef={this.clientRef}
            id={this.state.roomId}
          />
        )}
        <Typography variant="h4" className="result">{this.getPlacement()}</Typography>
        {this.state.members.length === this.state.standings.length && <Button className="reset" color="secondary" variant="outlined" onClick={this.resetGame}> Ready</Button>}
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
