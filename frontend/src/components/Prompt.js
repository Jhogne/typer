import React from 'react';

import Typography from '@material-ui/core/Typography'
import makeStyles from "@material-ui/core/styles/makeStyles"
import cx from 'classnames';


const useStyles = makeStyles((theme) => ({
  promptText: {
    fontSize: "34px",
    padding: 0,
    margin: 0,
  },
  cursor: {
    borderRight: '2px solid',
    marginRight: '-2px',
  },
  promptBox: {
    width: "100%",
    textAlign: "left",
    textJustify: "distribute",
    padding: 0,
    margin: 0,
    userSelect: "none",
  }
}));

function divideText(text, current, error, classes) {
    return (
      <>
        <Typography className={ cx(classes.promptText, classes.cursor)} color="primary" variant="body1" component="span">{text.slice(0, current)}</Typography>
        <Typography className={classes.promptText} color={error ? "error" : "initial"} variant="body1" component="span">
          {text.slice(current, text.length)}
        </Typography>
      </>
    );
  }

export default function Prompt(props) {
  const classes = useStyles();
    return(
        <div className={classes.promptBox}>
          {!props.finished && <Typography variant="body1" >{divideText(props.text, props.current, props.error, classes)}</Typography>}
        </div>
    );
}