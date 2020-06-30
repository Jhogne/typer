import React from 'react'

var originalText;
var words = 0;
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {input:'', correct:'', start:'', wpm:0, remaining:this.props.text, lastWord:''}
    this.handleChange = this.handleChange.bind(this);
    this.getWPM = this.getWPM.bind(this);
    this.sendMessage = this.sendMessage.bind(this);


    originalText = this.state.remaining;
  }

  handleChange(event) {
    const input = event.target.value[event.target.value.length-1];
    var lastWord = this.state.lastWord + input;
    if(this.state.remaining === originalText) {
      var d = new Date();
      this.setState({start:d.getTime()})
    }
    if(this.state.remaining[0] === input) {
      if(input === ' ' || input === '.') {
        words++;
        lastWord = '';
      }
      this.setState({correct:this.state.correct.concat(input), remaining:this.state.remaining.slice(1)});
    }
    if(this.state.remaining === '') {
      this.sendMessage(`/app/room/${this.props.id}/victory`, this.getWPM());
      console.log("You won!");
      console.log(`You typed ${words} words in ${words / this.state.wpm} minutes`);
    }
    this.setState({input:input, wpm:this.getWPM(), lastWord:lastWord});
  }

  sendMessage = (location, msg) => {
    try {
      this.props.clientRef.sendMessage(location, JSON.stringify(msg));
      return true;
    } catch (e) {
      return false;
    }
  }

  getWPM() {
    var d = new Date();
    var end = d.getTime()
    var time = end-this.state.start;
    var minutes = time/60000;
    return words / minutes;
  }

  render() {
    return(
      <div>
        <p>{this.state.remaining}</p>
        <p>{this.state.correct} | WPM: {this.state.wpm} </p>
        <input type='text' value={this.state.input} onChange={this.handleChange}/>
      </div>
    );
  }
}

export default Game;