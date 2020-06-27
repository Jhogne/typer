import React from 'react'
import axios from 'axios';
import SockJsClient from 'react-stomp';


async function makeGetRequest(location) {

  let res = await axios.get('http://localhost:8080/' + location);
  let data = res.data;
  return data;
}


class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {id:this.props.location.state.id, amount:1};
    console.log(this.state.id);
}

componentWillUnmount() {
  this.sendMessage("/app/leave", this.state.id);   
}


sendMessage = (location, msg) => {
  try {
    this.clientRef.sendMessage(location, JSON.stringify(msg));
    return true;
  } catch(e) {
    return false;
  }
}

render(){
  return(
    <div>
      <h1>This is room "{this.state.id}" with {this.state.amount} members</h1>
      <SockJsClient url={ 'http://localhost:8080/gs-guide-websocket' } topics={["/topic/room"]}
          onMessage={(msg) => {console.log(msg);this.setState({id:msg.id, amount:msg.members})}} ref={ (client) => { this.clientRef = client }}
          onConnect={ () => { console.log('Connected'); this.sendMessage("/app/update", this.state.id)} }
          onDisconnect={ () => { 
            console.log('Disconnected');  
          } }
          debug={ true }/>
    </div>
    );
  }
}

export default Room;