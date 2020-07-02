import React from "react";

import { sendMessage } from "./ApiRequests";

import "./Game.css"
var originalText;
var words;
var idx = 0;
var wordStart = 0;
var error = false;
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
    this.onKeyDown = this.onKeyDown.bind(this);

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
    if(this.props.text.slice(wordStart, wordStart + newWord.length) === newWord){
        error = false;
        if(newWord.length != 0) {
          idx = wordStart + newWord.length; 
          if((lastInput === ' ' || lastInput === '.')){  
            newWord = "";
            words++;
            wordStart = idx;
          }     
        }
    } else {
      error = true;
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
    console.log(idx)
    this.setState({currentWord:newWord});
  }

  onKeyDown(event) {
    if (event.keyCode === 8) {
      console.log('--------delete--------');
      var newWord = event.target.value;
      var wordStart = Math.max(0,idx-newWord.length+1);
      console.log("Expect: " + this.props.text.slice(wordStart, idx+1));
      console.log('----------------------');

    }
  }

  getWPM() {
    var d = new Date();
    var end = d.getTime();
    var time = end - this.state.start;
    var minutes = time / 60000;
    return words / minutes;
  }

  divideText(){
    return(
      <>
        <span className="correct">{this.props.text.slice(0,idx)}</span>
        <span className={error ? "error" : "remaining"}>{this.props.text.slice(idx,this.props.text.length)}</span>
      </>
    )
  }

  render() {
    return (
      <div>
        <p className="default">{this.divideText() }</p>
        <p> WPM: {this.getWPM()}</p>
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
