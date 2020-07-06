import React, { Component } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

import "./PlayerProgress.css"
import ColoredLinearProgress from "./ColoredLinearProgress"
  

const styles = props => ({
    colorPrimary: {
      backgroundColor: '#222222',
    },
    barColorPrimary: {
      backgroundColor: '#f48fb1',
    }
  });

class PlayerProgress extends React.Component {
  render() {
  const { classes } = this.props;
  return (
    <div className="foo">
      <LinearProgress className="bar" variant="determinate" value={50} classes={{colorPrimary: classes.colorPrimary, barColorPrimary: classes.barColorPrimary}} />
    </div>
  );
  }
}

export default withStyles(styles)(PlayerProgress);