import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { LinearProgress, Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  transparent: {
    backgroundColor: "transparent",
  },
  primary: {
    backgroundColor: theme.palette.primary.main,
  },
  secondary: {
    backgroundColor: theme.palette.secondary.main,
  },
  root: {
    height: 4,
    borderRadius: 3,
  },
}));

function PlayerProgress(props) {
  const classes = useStyles();
  return (
    <Container className="foo">
      <LinearProgress
        className="bar"
        variant="determinate"
        value={props.progress}
        classes={{
          root: classes.root,
          colorPrimary: classes.transparent,
          barColorPrimary:
            props.color === "primary" ? classes.primary : classes.secondary,
        }}
      />
    </Container>
  );
}

export default PlayerProgress;
