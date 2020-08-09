import React from "react";

import Typography from "@material-ui/core/Typography";

function divideText(text, current, error) {
  return (
    <>
      <span className="correct">{text.slice(0, current)}</span>
      <span className={error ? "error" : "remaining"}>
        {text.slice(current, text.length)}
      </span>
    </>
  );
}

export default function Prompt(props) {
  return (
    <div className="promptBox">
      {!props.finished && (
        <Typography variant="body1" className="default">
          {divideText(props.text, props.current, props.error)}
        </Typography>
      )}
    </div>
  );
}
