import React from "react";

import PlayerProgress from "./PlayerProgress";
import { Grid, Typography } from "@material-ui/core"
import "./Standings.css"

import Done from "@material-ui/icons/Done"


class Standings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    getProgress(id) {
        var myProgress = 0
        this.props.players.forEach((player) => {
            if(player.id === id) {
                myProgress =  player.progress;
            }
        });

        return myProgress;
    }

    getWpm(id) {
        var myWpm = 0
        this.props.players.forEach((player) => {
            if(player.id === id) {
                myWpm =  player.wpm;
            }
        });

        return myWpm;
    }

    getReady(id) {
        var ready = false;
        this.props.players.forEach((player) => {
            if(player.id === id) {
                ready =  player.ready;
            }
        });
        return ready;

    }

    getOpponents() {
        var players = this.props.players;
        players.sort((a, b) => {
            return a.id - b.id
    
        });
        const bars = players.filter((player) => {return player.id !== this.props.myId}).map((player) => {
            return (
                <Grid container spacing={2} direction="row" alignItems="center" className="player">
                    <Grid item>
                        <Typography className="opponentText" variant="body1">{player.id}</Typography>
                    </Grid>
                    <Grid item xs>
                        <PlayerProgress className="progress" key={player.id} you={false} id={player.id} progress={player.progress} wpm={player.wpm} />
                    </Grid>
                    <Grid item>
                        <Typography className="opponentText" variant="body1"> {this.getWpm(player.id)} WPM</Typography>
                    </Grid>
                    <Grid item>
                    {this.getReady(player.id) ? <Done color="secondary" /> : <Done style={{color:'transparent'}} /> }
                    </Grid>
                </Grid>
            ) 
          }
        );
        return bars;
    }

    render() {
        return(
            <div className="standingsRoot">
                <Grid container spacing={2} direction="row" alignItems="center" className="player">
                    <Grid item>
                        <Typography className="myText" variant="body1">{this.props.myId}</Typography>
                    </Grid>
                    <Grid item xs>
                        <PlayerProgress you={true} id={this.props.myId} progress={this.getProgress(this.props.myId)} />
                    </Grid>
                    <Grid item>
                        <Typography className="myText" variant="body1"> {this.getWpm(this.props.myId)} WPM</Typography>
                    </Grid>
                    <Grid item>
                        {this.getReady(this.props.myId) ? <Done color="primary" /> : <Done style={{color:'transparent'}} /> }
                    </Grid>
                </Grid>
                {this.getOpponents()}
            </div>
        );
    }
}

export default Standings;