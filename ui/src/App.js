import React from 'react';
// import axios from 'axios';
import {Route, Switch} from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import HomePage from './pages/HomePage/HomePage';
import UserForm from './components/form/UserForm';
import ShowForm from './components/form/ShowForm';
import Dashboard from './pages/Dashboard/Dashboard';
import ListOfForms from './components/form/ListOfForms';
import FilledForms from './components/form/FilledForms';

const App = () => (
  <div className="App">
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/userform/:formID" component={UserForm} />
      <Route exact path="/showform/:formID" component={ShowForm} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/formslist" component={ListOfForms} />
      <Route exact path="/filledforms/:templateID" component={FilledForms} />
    </Switch>
  </div>
);

export default App;
