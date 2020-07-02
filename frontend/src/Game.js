import React from "react";

import { sendMessage } from "./ApiRequests";

var originalText;
var words;
var idx = 0;
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      correct: "",
      start: "",
      wpm: 0,
      remaining: this.props.text,
      currentWord: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.getWPM = this.getWPM.bind(this);
    this.reset = this.reset.bind(this);

    this.reset();
  }

  reset() {
    //this.setState({correct:"", start:"", wpm:0, remaining:this.props.text,currentWord:""})
    originalText = this.state.remaining;
    words = 0;
  }

  handleChange(event) {
    var newWord = event.target.value;
    var lastInput = event.target.value[event.target.value.length - 1];

    if(idx === 0) {
      var d = new Date();
      this.state.start = d.getTime();
    }
    var wordStart = Math.max(0,idx-newWord.length+1);
    if(this.props.text.slice(wordStart, idx+1) === newWord && newWord.length != 0){
        idx++;
      if((lastInput === ' ' || lastInput === '.')){  
        newWord = "";
        words++;
      } 
    }

    if(idx === this.props.text.length) {
      console.log("You won!");
      console.log("WPM: " + this.getWPM());
      idx = 0;
      words = 0;
      newWord = "";
      sendMessage(
        this.props.clientRef,
        `/room/${this.props.id}/victory`,
        this.props.memberId
      );
    }
    this.setState({currentWord:newWord});
  }

  getWPM() {
    var d = new Date();
    var end = d.getTime();
    var time = end - this.state.start;
    var minutes = time / 60000;
    return words / minutes;
  }

  render() {
    return (
      <div>
        <p>{this.state.remaining}</p>
        <p>
          {this.props.text.slice(0,idx)} | WPM: {this.getWPM()}
        </p>
        <input
          type="text"
          disabled={this.props.disabled}
          value={this.state.currentWord}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default Game;
