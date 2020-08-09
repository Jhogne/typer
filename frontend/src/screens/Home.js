import React from "react";
import { Box, Typography } from "@material-ui/core";
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
    marginTop: 50,
  },
});

export class Home extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Box display="flex" flexDirection="column" justifyContent="center"  alignItems="center" alignContent="center">
        <Typography className={classes.title} variant="h1" color="primary">
          Typer
        </Typography>
        <RoomForm />
      </Box>
    );
  }
}

export default withStyles(styles)(Home);
