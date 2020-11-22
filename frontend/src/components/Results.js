import React from "react";
import { Typography, Grid } from "@material-ui/core";
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
        <Typography className={classes.left}>
          <Timer />
          &nbsp;{Math.floor(props.time / 1000)}s
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography className={classes.right}>
          <ErrorOutline />
          &nbsp;{props.errors}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography className={classes.left}># {props.words}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography className={classes.right}>
          <Adjust />
          &nbsp;{Math.round(props.accuracy * 10000) / 100}%
        </Typography>
      </Grid>
    </Grid>
  );
}
