import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Room from "screens/Room";
import Home from "screens/Home";
import "./App.css";
import { withRouter } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/room/*" component={withRouter(Room)} />
        <Redirect from="/*" to={Home} />
      </Switch>
    );
  }
}

export default App;
