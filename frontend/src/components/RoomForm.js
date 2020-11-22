import React from "react";
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import { joinRoom, createRoom } from "utils/ApiRequests";
import withStyles from "@material-ui/core/styles/withStyles";
import { withRouter } from "react-router-dom/";

const styles = (theme) => ({
  input: {
    color: theme.palette.text.main,

    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#545454",
      },
      "&:hover fieldset": {
        borderColor: theme.palette.text.main,
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.main,
      },
    },
  },
  root: {
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    marginBottom: 200,
  },
});

class RoomForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { code: "", name: "", roomError: false, nameError: false };

    this.handleCodeChange = this.handleCodeChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleJoin = this.handleJoin.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
  }

  handleCodeChange(event) {
    if (event.target.value.length <= 4) {
      this.setState({ code: event.target.value });
    }
    event.preventDefault();
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
    event.preventDefault();
  }

  handleJoin(event) {
    event.preventDefault();
    joinRoom(
      this.state.code,
      this.state.name,
      (res) => {
        this.props.history.push(`/room/`, {
          roomId: this.state.code,
          playerId: res,
        });
      },
      (error) => {
        if (error.response) {
          switch (error.response.status) {
            case 404:
              this.setState({ roomError: true });
              break;
            case 409:
              this.setState({ nameError: true });
              break;
            default:
              break;
          }
        }
      }
    );
  }

  handleCreate(event) {
    event.preventDefault();
    createRoom(this.state.name, (res) => {
      this.props.history.push(`/room/${res.roomId}`, {
        roomId: res.roomId,
        playerId: res.playerId,
      });
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid container spacing={2} direction="column" alignItems="center">
        <Grid item xs={12}>
          <TextField
            className={classes.input}
            error={this.state.nameError}
            value={this.state.name}
            variant="outlined"
            label="name"
            InputProps={{
              style: { fontSize: "1rem", color: "#d0d0d0" },
            }}
            InputLabelProps={{ style: { fontSize: "1rem" } }}
            onChange={this.handleNameChange}
            helperText={this.state.nameError ? "Name already in use" : ""}
          />
        </Grid>
        <Grid
          container
          item
          xs={12}
          spacing={2}
          direction="row"
          alignItems="center"
          justify="center"
        >
          <Grid item>
            <TextField
              className={classes.input}
              error={this.state.roomError}
              label="Code"
              value={this.state.code}
              variant="outlined"
              onChange={this.handleCodeChange}
              helperText={this.state.roomError ? "Room doesn't exist" : ""}
              style={{ width: 150 }}
              InputProps={{
                style: { fontSize: "1rem", color: "#d0d0d0" },
              }}
              InputLabelProps={{ style: { fontSize: "1rem" } }}
              color="primary"
            />
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              onClick={this.handleJoin}
              color="secondary"
            >
              Enter room
            </Button>
          </Grid>
        </Grid>

        <Grid item>
          <Typography variant="overline">or</Typography>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            onClick={this.handleCreate}
            color="secondary"
          >
            Create room
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(withRouter(RoomForm));
