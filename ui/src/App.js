import React from 'react';
// import axios from 'axios';
import {Route, Switch} from 'react-router-dom';
import SignIn from './pages/SignIn';
import HomePage from './pages/HomePage';
import UserForm from './components/form/UserForm/UserForm';
import ShowForm from './components/form/ShowForm/ShowForm';
import AddForm from './components/form/AddForm/AddForm';
import ListOfForms from './components/form/ListOfForms/ListOfForms'

// const apiUrl = '/api';

const App = () => (
  <div className="App">
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/userform/:formID" component={UserForm} />
      <Route exact path="/showform/:formID" component={ShowForm} />
      <Route exact path="/addform" component={AddForm} />
        <Route exact path="/listofforms" component={ListOfForms} />
    </Switch>
  </div>
);

export default App;
