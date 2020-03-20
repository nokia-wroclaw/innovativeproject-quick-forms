import React from 'react';
//import axios from 'axios';
import { Route, Switch } from 'react-router-dom';
import SignIn from './pages/SignIn';
import HomePage from './pages/HomePage';
import UserForm from './components/form/UserForm/UserForm';
import SingleForm from "./components/form/SingleForm/SingleForm";
//const apiUrl = '/api';

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/signin' component={SignIn} />
        <Route exact path='/userform' component={UserForm} />
          <Route exact path='/singleform' component={SingleForm} />
      </Switch>
    </div>
  );
}

export default App;
