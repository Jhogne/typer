import React from "react";

import { sendMessage } from "./ApiRequests";

var originalText;
var words = 0;
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      winner: "",
      input: "",
      correct: "",
      start: "",
      wpm: 0,
      remaining: this.props.text,
      lastWord: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.getWPM = this.getWPM.bind(this);

    originalText = this.state.remaining;
  }

  handleChange(event) {
    const input = event.target.value[event.target.value.length - 1];
    var lastWord = event.target.value;
    if (this.state.remaining === originalText) {
      var d = new Date();
      this.setState({ start: d.getTime() });
    }
    if (this.state.remaining[0] === input) {
      if (input === " " || input === ".") {
        words++;
        lastWord = "";
      }
      var newRemaning = this.state.remaining.slice(1);
      if (newRemaning === "") {
        sendMessage(
          this.props.clientRef,
          `/room/${this.props.id}/victory`,
          this.props.memberId
        );
        console.log("You won!");
        console.log(
          `You typed ${words} words in ${words / this.state.wpm} minutes`
        );
      }
      this.setState({
        correct: this.state.correct.concat(input),
        remaining: newRemaning,
      });
    }
    this.setState({ input: input, wpm: this.getWPM(), lastWord: lastWord });
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
          value={this.state.lastWord}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default Game;
