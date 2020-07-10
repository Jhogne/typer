import React from "react";

import { sendMessage } from "./ApiRequests";
import "./Game.css";

import { TextField, Typography} from '@material-ui/core'

var words = 0;
var idx = 0;
var wordStart = 0;
var error = false;

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
          this.setState({wpm:this.getWPM()});
          sendMessage(
            this.props.clientRef, 
            `/room/${this.props.id}/postState`,
            {playerId:this.props.memberId, completed:this.props.text.slice(0,idx), wpm:this.state.wpm, ready:false},)
        }
      }
    } else {
      error = true;
    }
    if (idx === this.props.text.length) {
      idx = 0;
      words = 0;
      newWord = "";
      wordStart = 0;
      sendMessage(
        this.props.clientRef,
        `/room/${this.props.id}/finish`,
        this.props.memberId
      );
    }
    this.setState({ currentWord: newWord });
  }

  getWPM() {
    var d = new Date();
    var endTime = d.getTime();
    var time = endTime - this.props.startTime;
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
      <div className="root">
        <div className="promptBox">
          {!this.props.finished && <Typography variant="body1" className="default">{this.divideText()}</Typography>}
        </div>
        {!this.props.finished && <TextField
          className="input"
          type="text"
          disabled={this.props.disabled}
          value={this.state.currentWord}
          onChange={this.handleChange}
          variant="outlined"
        />}
      </div>
    );
  }
}

export default Game;
