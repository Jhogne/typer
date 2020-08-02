import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Room from "screens/Room";
import Home from "screens/Home";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/room/*" component={Room} />
        <Redirect from="/*" to={Home} />
      </Switch>
    );
  }
}

export default App;
