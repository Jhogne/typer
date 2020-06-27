import React from 'react';
import {
  Route,
  Switch
} from "react-router-dom";

import Room from './Room';
import Home from './Home';


class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/room' component={Room} />
      </Switch>
    );
  }
}

export default App;
