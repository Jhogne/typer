import React from "react";

import { Typography } from "@material-ui/core";

export default function Countdown(props) {
  var value;
  if (props.value === 0) {
    value = "Type!";
  } else if (props.value > 0) {
    value = props.value;
  } else {
    value = "Get ready";
  }

  return (
    <Typography
      variant="body1"
      style={{
        color: props.finished ? "transparent" : "",
      }}
    >
      {value}
    </Typography>
  );
}
