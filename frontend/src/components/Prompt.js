import React from "react";

import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  cursor: {
    boxShadow: "-2px 0px 0px " + theme.palette.primary.main,
  },

  promptBox: {
    width: "100%",
    textAlign: "left",
    padding: 0,
    margin: 0,
    userSelect: "none",
  },
}));

function divideText(text, current, error, classes) {
  return (
    <>
      <Typography color="primary" variant="body2" component="span">
        {text.slice(0, current)}
      </Typography>
      <Typography
        className={classes.cursor}
        color={error ? "error" : "initial"}
        variant="body2"
        component="span"
      >
        {text.slice(current, text.length)}
      </Typography>
    </>
  );
}

export default function Prompt(props) {
  const classes = useStyles();
  return (
    <div className={classes.promptBox}>
      <Typography variant="body1">
        {divideText(props.text, props.current, props.error, classes)}
      </Typography>
    </div>
  );
}
