import React from 'react';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {code: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
  }

  handleChange(event) {
    this.setState({code:event.target.value});
    event.preventDefault();
  }

  handleSubmit(event) {
    console.log(this.state.code);
    event.preventDefault();
  }

  handleCreate(event) {
    console.log('Creating room...');
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <button type='button' onClick={this.handleCreate}> Create room</button>
        <form onSubmit={this.handleSubmit}> 
          <label>Code:</label>
          <input type='text' value={this.state.code} onChange={this.handleChange}/>
          <input type='submit' value='enter room' />
        </form>
      </div>
    );
  }
}

export default App;
