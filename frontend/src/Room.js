import React from 'react'
import SockJsClient from 'react-stomp';

class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = { id: this.props.location.state.id, amount: 1 };
    console.log(this.state.id);
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

  render() {
    return (
      <div>
        <h1>This is room "{this.state.id}" with {this.state.amount} members</h1>
        <SockJsClient url={'http://localhost:8080/endpoint'} topics={[`/topic/room/${this.state.id}`]}
          onMessage={(msg) => { console.log(msg); this.setState({ id: msg.id, amount: msg.members }) }} ref={(client) => { this.clientRef = client }}
          onConnect={() => { console.log('Connected'); this.sendMessage(`/app/room/${this.state.id}/update`, null); this.sendMessage("/app/room/" + this.state.id, "hello from client") }}
          onDisconnect={() => {
            console.log('Disconnected');
          }}
          debug={true} />
      </div>
    );
  }
}

export default Room;