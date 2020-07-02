import React from "react";

import { sendMessage } from "./ApiRequests";

import "./Game.css";

var words = 0;
var idx = 0;
var wordStart = 0;
var error = false;
var startTime;

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wpm: 0,
      currentWord: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.getWPM = this.getWPM.bind(this);
  }

  handleChange(event) {
    var newWord = event.target.value;
    var lastInput = event.target.value[event.target.value.length - 1];

    if (idx === 0) {
      var d = new Date();
      startTime = d.getTime();
    }
    if (
      this.props.text.slice(wordStart, wordStart + newWord.length) === newWord
    ) {
      error = false;
      if (newWord.length !== 0) {
        idx = wordStart + newWord.length;
        if (lastInput === " " || lastInput === ".") {
          newWord = "";
          words++;
          wordStart = idx;
        }
      }
    } else {
      error = true;
    }
    if (idx === this.props.text.length) {
      console.log("You won!");
      console.log("WPM: " + this.getWPM());
      idx = 0;
      words = 0;
      newWord = "";
      wordStart = 0;
      sendMessage(
        this.props.clientRef,
        `/room/${this.props.id}/victory`,
        this.props.memberId
      );
    }
    this.setState({ currentWord: newWord });
  }

  getWPM() {
    var d = new Date();
    var endTime = d.getTime();
    var time = endTime - startTime;
    var minutes = time / 60000;
    return words / minutes;
  }

  divideText() {
    return (
      <>
        <span className="correct">{this.props.text.slice(0, idx)}</span>
        <span className={error ? "error" : "remaining"}>
          {this.props.text.slice(idx, this.props.text.length)}
        </span>
      </>
    );
  }

  render() {
    return (
      <div>
        <p className="default">{this.divideText()}</p>
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
