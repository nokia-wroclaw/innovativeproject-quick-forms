import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

export const isAuth = () => {
    if (Cookies.get('access_token')){
        function axiosGetCookie(){
            return axios.get('/api/auth/protected').then(res => {
                if (res.status === 200){
                    return Cookies.get('access_token');
                } else return false
            });
        }
      return axiosGetCookie().then(cookie => cookie);
    }
};

export const logout = () => {
  Cookies.remove('access_token');
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => 
      isAuth() ? (
        <Component {...props} />
      ) : (
        <Redirect 
          to={{
            pathname: '/signin',
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

export default PrivateRoute;