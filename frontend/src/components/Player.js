import React from "react";
import { Grid, Typography } from "@material-ui/core";
import Done from "@material-ui/icons/Done";
import { PlayerProgress } from "components/";

export default function Player(props) {
  return (
    <Grid
      container
      spacing={0}
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Grid item xl={1} lg={1} md={2} sm={2} xs={4}>
        <Typography color={props.color} align="right" variant="body1" noWrap>
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
      <Grid item xl={1} lg={2} md={2} sm={2} xs={4}>
        <Typography color={props.color} variant="body1" align="left">
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
