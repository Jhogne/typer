import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";

import App from "./App";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#f48fb1",
    },
    secondary: {
      main: "#90caf9",
    },
    background: {
      main: '#222222',
    },
  },
  typography: {
    body1: {
      fontSize: 24,
      color: '#d0d0d0',
    },
    h4: {
      color: '#d0d0d0',
    }
  }
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Router>
      <App />
    </Router>
  </ThemeProvider>,
  document.getElementById("root")
);
