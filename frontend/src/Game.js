import React from "react";

import { sendMessage } from "./ApiRequests";

var originalText;
var words = 0;
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      correct: "",
      start: "",
      wpm: 0,
      remaining: this.props.text,
      currentWord: "",
    };
    originalText = this.state.remaining;

    this.handleChange = this.handleChange.bind(this);
    this.getWPM = this.getWPM.bind(this);
  }

  handleChange(event) {
    const lastInput = event.target.value[event.target.value.length - 1];
    var currentWord = event.target.value;
    if (this.state.remaining === originalText) {
      var d = new Date();
      this.setState({ start: d.getTime() });
    }
    if (this.state.remaining.slice(0,currentWord.length) === currentWord) {
      if (lastInput === " " || lastInput === ".") {
        words++;
        var newRemaning = this.state.remaining.slice(currentWord.length, this.state.remaining.length);
        currentWord = "";
        if (newRemaning === "") {
          sendMessage(
            this.props.clientRef,
            `/room/${this.props.id}/victory`,
            this.props.memberId
          );
        }
        this.setState({
          correct: this.state.correct.concat(lastInput),
          remaining: newRemaning,
        });

      }
    }
    this.setState({ wpm: this.getWPM(), currentWord: currentWord });
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
          {this.state.correct} | WPM: {this.state.wpm}{" "}
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
