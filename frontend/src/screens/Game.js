import React from "react";
import { TextField, Typography } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import { updatePlayer, finishGame } from "utils/ApiRequests";
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
      "&.Mui-disabled fieldset": {
        borderColor: theme.palette.primary.dark,
        borderWidth: 2,
      }

    },
  },
  root: {
    padding: 2,
    width: "100%",
  },
});

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentWord: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    if(event.target.value.length > 20) { 
      return;
    }

    this.props.gameState.input = event.target.value;

    this.props.gameState.verifyInput(this.props.prompt.text);

    if (!this.props.gameState.error) {
      updatePlayer(this.props.clientRef, this.props.id, {
        playerId: this.props.playerId,
        completed: this.props.prompt.text.slice(0, this.props.gameState.idx),
        ready: false,
      });
    }

    if (this.props.gameState.idx === this.props.prompt.text.length) {
      finishGame(this.props.clientRef, this.props.id, this.props.playerId);

    }

    this.setState({ currentWord: this.props.gameState.input });
  }
  
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Prompt
          text={this.props.prompt.text}
          current={this.props.gameState.idx}
          error={this.props.gameState.error}
        />
        {this.props.prompt.source && 
        <Typography color="primary" variant="body2" align="right">
          -{this.props.prompt.source}
        </Typography>
        }
        <TextField
          color="primary"
          className={classes.input}
          type="text"
          fullWidth
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
      </div>
    );
  }
}

export default withStyles(styles)(Game);
