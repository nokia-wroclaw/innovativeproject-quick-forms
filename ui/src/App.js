import React from 'react';
// import axios from 'axios';
import {Route, Switch} from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import HomePage from './pages/HomePage';
import UserForm from './components/form/UserForm/UserForm';
import ShowForm from './components/form/ShowForm/ShowForm';
import AddForm from './components/form/AddForm/AddForm';
import Dashboard from './pages/Dashboard/Dashboard';

// const apiUrl = '/api';

const App = () => (
  <div className="App">
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
      <Route exact path="/userform/:formID" component={UserForm} />
      <Route exact path="/showform/:formID" component={ShowForm} />
      <Route exact path="/addform" component={AddForm} />
      <Route exact path="/dashboard" component={Dashboard} />
    </Switch>
  </div>
);

export default App;
