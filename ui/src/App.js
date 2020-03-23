import React from 'react';
// import axios from 'axios';
import {Route, Switch} from 'react-router-dom';
import SignIn from './pages/SignIn';
import HomePage from './pages/HomePage';
import UserForm from './components/form/UserForm/UserForm';
import ShowForm from './components/form/ShowForm/ShowForm';
import AddForm from './components/form/AddForm/AddForm';

// const apiUrl = '/api';

const App = () => (
  <div className="App">
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/userform" component={UserForm} />
      <Route exact path="/showform" component={ShowForm} />
      <Route exact path="/addform" component={AddForm} />
    </Switch>
  </div>
);

export default App;
