import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { ThemeProvider } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles"

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#f48fb1',
    },
    secondary: {
      main: '#90caf9',
    },
    neutral: {
      main: '#5c6ac4',
    },
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
