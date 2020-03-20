import React from 'react';
//import axios from 'axios';
import { Route, Switch } from 'react-router-dom';
import SignIn from './components/SignIn';
import HomePage from './components/HomePage';
import UserForms from './components/UserForms'
import SingleForm from './components/form/singleForm/singleForm';
//const apiUrl = '/api';

const App = () => {
  return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/signin' component={SignIn} />
          <Route exact path='/userform' component={UserForms} />
          <Route exact path='/singleform' component={SingleForm} />

        </Switch>
      </div>
  );
}

export default App;