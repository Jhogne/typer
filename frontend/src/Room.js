import React from 'react'
import SockJsClient from 'react-stomp';

import Game from './Game'

class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = { id: this.props.location.state.id, amount: 1, text:'' };
    this.updateRoom = this.updateRoom.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
  }

  componentWillUnmount() {
    this.sendMessage(`/app/room/${this.state.id}/leave`, this.state.id);
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
    this.sendMessage(`/app/room/${this.state.id}/update`, "Hello"); 
  }

  handleMessage(msg) {
    if(msg.winnerWPM != null){
      console.log(`SOMEONE WON WITH ${msg.winnerWPM} WPM!!!`)
    }
    this.setState({ id: msg.id, amount: msg.members, text:msg.text });
  }

  render() {
    return (
      <div>
        <h1>This is room "{this.state.id}" with {this.state.amount} member(s)</h1>
        {
          this.state.text.length > 0 && <Game text = {this.state.text} clientRef = {this.clientRef} id = {this.state.id}/> // Render game after message is recieved
        }
        <SockJsClient 
          url={'http://192.168.1.137:8080/endpoint'} 
          topics={[`/topic/room/${this.state.id}`]}
          onMessage={this.handleMessage } 
          ref={(client) => { this.clientRef = client }}
          onConnect={this.updateRoom}
          debug={false} />
      </div>
    );
  }
}

export default Room;