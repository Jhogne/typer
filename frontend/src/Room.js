import React from 'react'
import SockJsClient from 'react-stomp';

import Game from './Game'

class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = { memberId:this.props.location.state.memberId, winner:'', userId: '', roomId: this.props.location.state.roomId, amount: 1, text:'' };
    this.updateRoom = this.updateRoom.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
  }

  componentWillUnmount() {
    this.sendMessage(`/app/room/${this.state.roomId}/leave`, this.state.roomId);
  }

  sendMessage = (location, msg) => {
    try {
      this.clientRef.sendMessage(location, JSON.stringify(msg));
      return true;
    } catch (e) {
      return false;
    }
  }

  updateRoom() {
    this.sendMessage(`/app/room/${this.state.roomId}/update`, "Hello"); 
  }

  handleMessage(msg) {
    console.log(msg);
    this.setState({ winner:msg.winner,roomId: msg.roomId, amount: msg.memberAmount, text:msg.text });
  }

  getWinner() {
    if(this.state.winner !== -1) {
      return `The winner is: ${this.state.winner}`;
    } else {
      return '';
    }
  }

  render() {
    return (
      <div>
        <h1>This is room "{this.state.roomId}" with {this.state.amount} member(s)</h1>
        <h3>{this.getWinner()}</h3>
        {
          this.state.text.length > 0 && <Game memberId = {this.state.memberId} disabled = {this.state.winner !== -1} text = {this.state.text} clientRef = {this.clientRef} id = {this.state.roomId}/> // Render game after message is recieved
        }
        <SockJsClient 
          url={'http://192.168.1.137:8080/endpoint'} 
          topics={[`/topic/room/${this.state.roomId}`]}
          onMessage={this.handleMessage } 
          ref={(client) => { this.clientRef = client }}
          onConnect={this.updateRoom}
          debug={false} />
      </div>
    );
  }
}

export default Room;