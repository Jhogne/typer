import React, { Component } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

import "./PlayerProgress.css"
import ColoredLinearProgress from "./ColoredLinearProgress"
  

const styles = props => ({
    colorPrimary: {
      backgroundColor: '#222222',
    },
    barColorPrimaryYou: {
      backgroundColor: '#f48fb1',
    },
    barColorPrimaryOpponent: {
        backgroundColor: '#90caf9',
      }
  });

class PlayerProgress extends React.Component {
  render() {
  const { classes } = this.props;
  return (
    <div className="foo">
      <LinearProgress className="bar" variant="determinate" value={this.props.progress} classes={{colorPrimary: classes.colorPrimary, barColorPrimary: this.props.you ? classes.barColorPrimaryYou: classes.barColorPrimaryOpponent}} />
    </div>
  );
  }
}

export default withStyles(styles)(PlayerProgress);