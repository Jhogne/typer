import React from "react";
import SockJsClient from "react-stomp";

import Game from "./Game";
import { sendMessage } from "./ApiRequests";
import { Typography, Button } from "@material-ui/core";
import "./Room.css"

import Countdown from 'react-countdown';

import Standings from "./Standings"

const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <Typography variant="body1"> Type! </Typography>;
  } else {
    // Render a countdown
    return <Typography variant="body1">{seconds}</Typography>;
  }
};

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
      started: true,
    };
    this.updateRoom = this.updateRoom.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.countdownComplete = this.countdownComplete.bind(this);
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
      amount: msg.playerAmount,
      text: msg.text,
      members: msg.players,
      standings: msg.standings,
      startTime: msg.startTime
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
    this.setState({started:false})
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

  countdownComplete() {
    this.setState({started:true});
  }

  render() {
    return (
      <div className="root">
        <div className="content">
        <h6>
          This is room "{this.state.roomId}" with {this.state.amount} member(s)
        </h6>

        {this.state.startTime > (Date.now()) && <Countdown date={this.state.startTime} renderer={renderer} onComplete={this.countdownComplete} />}

        <Standings className="standings" players={this.state.members} myId={this.state.memberId}/>
        {this.state.text.length > 0 && ( // Render game after text is recieved
          <Game
            memberId={this.state.memberId}
            finished={this.state.standings.includes(this.state.memberId)}
            text={this.state.text}
            clientRef={this.clientRef}
            id={this.state.roomId}
            disabled={!this.state.started}
            startTime={this.state.startTime}
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
