import React from "react";
import { Grid, Typography } from "@material-ui/core";
import Done from "@material-ui/icons/Done";
import PlayerProgress from "components/PlayerProgress";

export default function Player(props) {
  return (
    <Grid container spacing={2} direction="row" alignItems="center">
      <Grid item xl={1} lg={2} md={2} sm={3} xs={4}>
        <Typography color={props.color} variant="body1">
          {props.id}
        </Typography>
      </Grid>
      <Grid item xs>
        <PlayerProgress
          color={props.color}
          id={props.id}
          progress={props.progress}
        />
      </Grid>
      <Grid item xl={2} lg={2} md={3} sm={3} xs={3}>
        <Typography color={props.color} variant="body1">
          {props.wpm} WPM
        </Typography>
      </Grid>
      <Grid item>
        {props.ready ? (
          <Done color={props.color} />
        ) : (
          <Done style={{ color: "transparent" }} />
        )}
      </Grid>
    </Grid>
  );
}
