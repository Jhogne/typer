import React from "react";
import { Grid, Typography } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import RoomForm from "components/RoomForm";

const styles = (theme) => ({
  root: {
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  title: {
    marginBottom: 50,
  },
});

export class Home extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography className={classes.title} variant="h1" color="primary">
          Typer
        </Typography>
        <RoomForm />
      </div>
    );
  }
}

export default withStyles(styles)(Home);
