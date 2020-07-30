import React from "react";
import SockJsClient from "react-stomp";
import { Typography, Button } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import Game from "screens/Game";
import {
  resetMessage,
  leaveMessage,
  updateRoomMessage,
} from "utils/ApiRequests";
import Standings from "components/Standings";
import GameState from "utils/GameState";
import Results from "../components/Results";


const styles = (theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    marginTop: "10%",
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  standings: {
    marginBottom: 90,
    paddingBottom: 90,
    borderStyle: "solid",
  },
  reset: {
    marginTop: 10,
  }
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
      startTime: -1,
      endTime: -1
    };
    
    gameState = new GameState();

    this.handleMessage = this.handleMessage.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  componentWillUnmount() {
    this.resetGame()
    leaveMessage(this.clientRef, this.props.location.state.roomId, this.props.location.state.playerId);
  }

  handleMessage(msg) {
    this.setState({
      prompt: msg.prompt,
      players: msg.players,
      standings: msg.standings,
      countdown: msg.countdown,
      startTime: msg.countdown === 0 ? this.state.startTime : Date.now() + msg.countdown * 1000
    });
    if(this.state.standings.includes(this.props.location.state.playerId) && this.state.endTime <= this.state.startTime) {
      this.setState({
          endTime: Date.now()
        }
      )
    }
    if(msg.countdown > 0) {
      gameState.reset();
    }   
  }

  resetGame() {
    this.setState({       
      standings: [],
      prompt: null,
    });
    resetMessage(this.clientRef, this.props.location.state.roomId, {
      playerId: this.props.location.state.playerId,
      completed: this.state.prompt.text,
      wpm: gameState.getWPM(this.state.startTime, this.state.endTime),
      ready: true,
    });
  }

  getPlacement() {
    return this.state.standings.includes(this.props.location.state.playerId)
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

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.content}>
          <h6>This is room "{this.props.location.state.roomId}"</h6>

          {this.state.countdown > 0 && (
            <Typography variant="body1">{this.state.countdown}</Typography>
          )}
          <Standings
            className={classes.standings}
            players={this.state.players}
            myId={this.props.location.state.playerId}
          />
          {this.state.prompt !== null && !this.state.standings.includes(this.props.location.state.playerId) && ( // Render game after text is recieved
            <Game
              playerId={this.props.location.state.playerId}
              finished={false}
              prompt={this.state.prompt}
              clientRef={this.clientRef}
              id={this.props.location.state.roomId}
              disabled={this.state.countdown !== 0}
              startTime={this.state.startTime}
              gameState={gameState}
            />
          )}
          {this.state.standings.includes(this.props.location.state.playerId) && (
            <>
            <Typography variant="h4" className="result">
              {this.getPlacement()}
            </Typography>

            <Results 
              time={this.state.endTime-this.state.startTime}
              words={gameState.words}
              errors={gameState.errors}
              accuracy={gameState.accuracy}
            />
            </>
          )}
          {(this.state.players.length === this.state.standings.length || (this.state.prompt !== null && this.state.prompt.text.length === 0)) && (
            <Button
              className={classes.reset}
              color="secondary"
              variant="outlined"
              onClick={this.resetGame}
            >
              Ready
            </Button>
          )}
          <SockJsClient
            url={"http://192.168.1.144:8080/endpoint"}
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
