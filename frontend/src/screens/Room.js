import React from "react";
import SockJsClient from "react-stomp";
import { Typography, Button } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import { Redirect } from "react-router-dom";

import { Game, Standings, Results, Countdown } from "components/";
import {
  resetMessage,
  leaveMessage,
  updateRoomMessage,
} from "utils/ApiRequests";
import GameState from "utils/GameState";

const styles = (theme) => ({
  root: {
    display: "flex",
    height: "100vh",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 200,
  },
  reset: {
    marginTop: 10,
  },
  results: {
    marginTop: 30,
  },
  roomId: {
    alignSelf: "flex-end",
  },
  standings: {
    width: "100%",
    marginBottom: 30,
  },
});

var gameState;
class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prompt: null,
      players: [],
      standings: [],
      countdown: -1,
    };

    gameState = new GameState();

    this.handleMessage = this.handleMessage.bind(this);
    this.clickReset = this.clickReset.bind(this);
  }

  componentWillUnmount() {
    if (this.props.location.state !== undefined) {
      leaveMessage(
        this.clientRef,
        this.props.location.state.roomId,
        this.props.location.state.playerId
      );
    }
    window.removeEventListener("beforeunload", this.goHome);
  }

  componentDidMount() {
    window.addEventListener("beforeunload", this.goHome);
  }

  goHome = (e) => {
    this.props.history.replace("/");
  };

  handleMessage(msg) {
    console.log(msg);

    if (msg === "") {
      this.clientRef.disconnect();
      this.goHome();
      return;
    }

    // Reset the game state when a new game is starting
    if (msg.countdown > 0) {
      gameState.reset();
    }
    this.setState({
      prompt: msg.prompt,
      players: msg.players,
      standings: msg.standings,
      countdown: msg.countdown,
    });

    if (this.hasFinished() && !this.state.time) {
      this.setState({
        time: Date.now() - msg.gameStart,
      });
    }
  }

  clickReset() {
    this.setState({
      standings: [],
      prompt: null,
      time: null,
    });
    resetMessage(this.clientRef, this.props.location.state.roomId, {
      playerId: this.props.location.state.playerId,
      completed: this.state.prompt.text,
      ready: true,
    });
  }

  getPlacement() {
    return this.hasFinished() && this.state.players > 1
      ? this.prettyPlacement(
          this.state.standings.indexOf(this.props.location.state.playerId)
        )
      : "";
  }

  prettyPlacement(number) {
    switch (number) {
      case 0:
        return "Winner";
      case 1:
        return "Second place";
      case 2:
        return "Third place";
      case 3:
        return "Fourth place";
      default:
        return "";
    }
  }

  hasFinished() {
    return this.state.standings.includes(this.props.location.state.playerId);
  }

  betweenGames() {
    return (
      this.state.players.length === this.state.standings.length ||
      (this.state.prompt !== null && this.state.prompt.text.length === 0)
    );
  }

  render() {
    if (this.props.location.state === undefined) {
      return <Redirect to="/" />;
    }
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.content}>
          <Countdown
            value={this.state.countdown}
            finished={this.hasFinished()}
          />
          <Standings
            style={classes.standings}
            players={this.state.players}
            myId={this.props.location.state.playerId}
          />
          {this.state.prompt !== null && !this.hasFinished() && (
            <Game
              playerId={this.props.location.state.playerId}
              finished={false}
              prompt={this.state.prompt}
              clientRef={this.clientRef}
              id={this.props.location.state.roomId}
              disabled={this.state.countdown !== 0}
              gameState={gameState}
            />
          )}
          {this.hasFinished() && (
            <>
              <Typography variant="h4">{this.getPlacement()}</Typography>
              <Results
                style={classes.results}
                time={this.state.time}
                words={this.state.prompt.length}
                errors={gameState.errors}
                accuracy={gameState.accuracy}
              />
            </>
          )}
          {this.betweenGames() && (
            <Button
              className={classes.reset}
              color="secondary"
              variant="outlined"
              onClick={this.clickReset}
            >
              Ready
            </Button>
          )}
          <Typography variant="overline" className={classes.roomId}>
            Room id: {this.props.location.state.roomId}
          </Typography>

          <SockJsClient
            url={"https://typer.jonashogne.se/api/endpoint"}
            topics={[`/topic/room/${this.props.location.state.roomId}`]}
            onMessage={this.handleMessage}
            ref={(client) => {
              this.clientRef = client;
            }}
            onConnect={() =>
              updateRoomMessage(
                this.clientRef,
                this.props.location.state.roomId
              )
            }
            debug={false}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Room);
