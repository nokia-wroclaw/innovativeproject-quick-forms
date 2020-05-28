import React from 'react';
import {Route, Switch} from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import HomePage from './pages/HomePage/HomePage';
import UserForm from './components/form/UserForm/UserForm';
import UserFormRedirect from "./components/form/UserForm/UserFormRedirect";
import Dashboard from './pages/Dashboard/Dashboard';
import FilledForms from './components/form/FilledForms';
import PrivateRoute from './components/PrivateRoute';
import FormCreator from './components/form/Creator/FormCreator';

const App = () => (
  <div className="App">
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/userform/:formID" component={UserFormRedirect} />
      <Route exact path="/userform/:formID/:pendingFormID" component={UserForm} />
      <PrivateRoute exact path="/dashboard" component={Dashboard} />
      <PrivateRoute exact path="/filledforms/:templateID" component={FilledForms} />
      <PrivateRoute exact path="/creator" component={FormCreator}/>
    </Switch>
  </div>
);

export default App;
