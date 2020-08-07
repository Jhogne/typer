import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";

import App from "./App";

import "fontsource-roboto-mono"
import 'fontsource-roboto';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#f48fb1",
    },
    secondary: {
      main: "#90caf9",
    },
    background: {
      main: "#222222",
    },
    error: {
      main: "#f44336",
    },
    text: {
      main: "#d0d0d0",
    },
  },
  typography: {
    body1: {
      fontSize: '1.5rem',
      color: "#d0d0d0",
    },
    body2: {
      fontSize: '2rem',
      color: "#d0d0d0",
    },
    h4: {
      color: "#d0d0d0",
    },
    h1: {
      fontFamily: 'Roboto Mono',
      fontWeight: 300,
    },
    overline: {
      color: "#d0d0d0",
      fontSize: '0.75rem',
    }
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Router>
      <App />
    </Router>
  </ThemeProvider>,
  document.getElementById("root")
);
