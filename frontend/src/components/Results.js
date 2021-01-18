import React from "react";
import { Typography, Grid, Tooltip } from "@material-ui/core";
import { Timer, ErrorOutline, Adjust } from "@material-ui/icons/";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  left: {
    justifyContent: "flex-end",
    marginRight: "20%",
    alignItems: "center",
    display: "flex",
  },

  right: {
    marginLeft: "20%",
    alignItems: "center",
    display: "flex",
  },
}));

export default function Results(props) {
  const classes = useStyles();
  return (
    <Grid className={props.style} container spacing={2} justify="center">
      <Grid item xs={6}>
        <Tooltip title="Time" placement="top-end" arrow enterDelay={500} leaveDelay={100}>
          <Typography className={classes.left}>
            <Timer />
            &nbsp;{Math.floor(props.time / 1000)}s
          </Typography>
        </Tooltip>
      </Grid>
      <Grid item xs={6}>
        <Tooltip title="Mistakes" placement="top-start" arrow enterDelay={500} leaveDelay={100}>
          <Typography className={classes.right}>
            <ErrorOutline />
            &nbsp;{props.errors}
          </Typography>
        </Tooltip>
      </Grid>
      <Grid item xs={6}>
        <Tooltip title="Words" placement="bottom-end" arrow enterDelay={500} leaveDelay={100}>
          <Typography className={classes.left}># {props.words}</Typography>
        </Tooltip>
      </Grid>
      <Grid item xs={6}>
        <Tooltip title="Accuracy" placement="bottom-start" arrow enterDelay={500} leaveDelay={100}>
          <Typography className={classes.right}>
            <Adjust />
            &nbsp;{Math.round(props.accuracy * 10000) / 100}%
          </Typography>
        </Tooltip>
      </Grid>
    </Grid>
  );
}
