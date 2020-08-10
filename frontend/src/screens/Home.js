import React from "react";
import { Box, Typography } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { RoomForm } from "components/";

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: 50,
    marginTop: 50,
  },
}));

function Home(props) {
  const classes = useStyles();
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      alignContent="center"
    >
      <Typography className={classes.title} variant="h1" color="primary">
        Typer
      </Typography>
      <RoomForm />
    </Box>
  );
}

export default Home;
