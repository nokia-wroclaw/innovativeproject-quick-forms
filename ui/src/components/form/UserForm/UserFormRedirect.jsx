import React, {Component} from 'react';
import UserFormIDGenerator from './UserFormIDGenerator';
import {Redirect, withRouter} from 'react-router-dom';

class UserFormRedirect extends Component {

  render() {
    const userFormUUID = UserFormIDGenerator();
    const formID = this.props.match.params.formID;

    return <Redirect to={`${formID}/${userFormUUID}`} />;
  }
}

export default withRouter(UserFormRedirect);
