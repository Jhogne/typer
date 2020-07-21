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

class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prompt: null,
      players: [],
      standings: [],
      countdown: -1,
      startTime: -1

    };
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
    console.log(this.state.startTime)
  }

  resetGame() {
    this.setState({       
      standings: [],
      prompt: null,
    });
    resetMessage(this.clientRef, this.props.location.state.roomId, {
      playerId: this.props.location.state.playerId,
      completed: this.state.prompt.text,
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
            />
          )}
          <Typography variant="h4" className="result">
            {this.getPlacement()}
          </Typography>
          {(this.state.players.length === this.state.standings.length || true) && (
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
