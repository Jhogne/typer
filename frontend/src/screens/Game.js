import React from "react";
import { TextField } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import { updatePlayer, finishGame } from "utils/ApiRequests";
import GameState from "utils/GameState";
import Prompt from "components/Prompt";

const styles = (theme) => ({
  input: {
    color: theme.palette.text.main,
    height: 80,
    fontSize: 34,

    "& label.Mui-focused": {
      color: theme.palette.primary.main,
      borderWidth: 2,
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: theme.palette.primary.main,
      borderWidth: 2,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: theme.palette.primary.main,
        borderWidth: 2,
      },
      "&:hover fieldset": {
        borderColor: theme.palette.primary.main,
        borderWidth: 2,
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.main,
        borderWidth: 3,
      },
    },
  },
  foo: {
    padding: 2,
  },
});

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
        playerId: this.props.playerId,
        completed: this.props.text.slice(0, myState.idx),
        wpm: myState.getWPM(this.props.startTime),
        ready: false,
      });
    }

    if (myState.idx === this.props.text.length) {
      myState.finishText();
      finishGame(this.props.clientRef, this.props.id, this.props.playerId);
    }
    this.setState({ currentWord: myState.input });
  }


  render() {
    const { classes } = this.props;
    return (
      <div className={classes.foo}>
        <Prompt
          text={this.props.text}
          current={myState.idx}
          finished={this.props.finished}
          error={myState.error}
        />
        {!this.props.finished && (
          <TextField
            color="primary"
            className={classes.input}
            type="text"
            disabled={this.props.disabled}
            autoFocus={!this.props.disabled}
            value={this.state.currentWord}
            onChange={this.handleChange}
            variant="outlined"
            InputProps={{
              className: classes.input,
            }}
            inputRef={input => input && input.focus()}
            />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(Game);
