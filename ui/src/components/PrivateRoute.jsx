import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import Cookies from 'js-cookie';

export const isAuth = () => {
  return Cookies.get('access_token');
};

export const logout = () => {
  Cookies.remove('access_token');
};

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route
    {...rest}
    render={props =>
      isAuth() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/signin',
            state: {from: props.location},
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
