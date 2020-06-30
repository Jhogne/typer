import React from 'react';

import axios from 'axios';

async function makeGetRequest(location) {

    let res = await axios.get('http://192.168.1.137:8080/' + location);
    let data = res.data;
    return data;
  }
  

export class Home extends React.Component {
    constructor(props) {
      super(props);
      this.state = { code: '' };
  
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
  
      const response = makeGetRequest(`joinRoom?id=${this.state.code}`);
      response.then(res => {
        this.props.history.push(`/room/`, { id: this.state.code })
      })
    }
  
    handleCreate(event) {
      const response = makeGetRequest('createRoom');
      event.preventDefault();
      response.then(res => {
        this.props.history.push(`/room/`, { id: res})
      });
    }
  
    sendMessage = (msg) => {
      try {
        this.clientRef.sendMessage("/app/update", JSON.stringify(msg));
        return true;
      } catch (e) {
        return false;
      }
    }
  
    render() {
      return (
        <div>
          <button type='button' onClick={this.handleCreate}> Create room</button>
          <form onSubmit={this.handleSubmit}>
            <label>Code:</label>
            <input type='text' value={this.state.code} onChange={this.handleChange} />
            <input type='submit' value='enter room' />
          </form>
        </div>
      );
    }
  }

  export default Home;