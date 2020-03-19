import React from 'react';
//import axios from 'axios';
import { Route, Switch } from 'react-router-dom';
import SignIn from './components/SignIn';
import HomePage from './components/HomePage';
//const apiUrl = '/api';

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/signin' component={SignIn} />>
      </Switch>
    </div>
  );
}

export default App;
