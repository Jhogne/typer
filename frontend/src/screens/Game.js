import React from "react";
import { TextField } from "@material-ui/core";
import { updatePlayer, finishGame } from "utils/ApiRequests";
import GameState from "utils/GameState";
import Prompt from "components/Prompt";
import "./Game.css";

var myState = new GameState();
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentWord: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    myState.input = event.target.value;

    myState.verifyInput(this.props.text);

    if (!myState.error) {
      updatePlayer(this.props.clientRef, this.props.id, {
        playerId: this.props.memberId,
        completed: this.props.text.slice(0, myState.idx),
        wpm: myState.getWPM(this.props.startTime),
        ready: false,
      });
    }

    if (myState.idx === this.props.text.length) {
      myState.finishText();
      finishGame(this.props.clientRef, this.props.id, this.props.memberId);
    }
    this.setState({ currentWord: myState.input });
  }

  render() {
    return (
      <div className="root">
        <Prompt
          text={this.props.text}
          current={myState.idx}
          finished={this.props.finished}
          error={myState.error}
        />
        {!this.props.finished && (
          <TextField
            className="input"
            type="text"
            disabled={this.props.disabled}
            value={this.state.currentWord}
            onChange={this.handleChange}
            variant="outlined"
          />
        )}
      </div>
    );
  }
}

export default Game;
