import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {withRouter} from 'react-router-dom';
import {isAuth, logout} from '../components/PrivateRoute';

const useStyles = makeStyles(theme => ({
  root: {
    zIndex: theme.zIndex.drawer + 1,
    flexGrow: 1,
    margin: '0px',
  },
  appbar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  bar: {
    background: 'linear-gradient(to right, #2980b9, #6dd5fa)',
  },
  button: {
    fontSize: 20,
    fontFamily: 'sans-serif',
    padding: '30px 50px 30px 50px',
    [theme.breakpoints.down('xs')]: {
      fontSize: 15,
      padding: '0 0 0 0',
      paddingLeft: 5,
      paddingRight: 5,
    },
    [theme.breakpoints.down('300')]: {
      fontSize: 10,
    },
  },
  title: {
    fontSize: 20,
    padding: '15px 50px 15px 5px',
    fontFamily: 'sans-serif',
    flexGrow: 1,
    [theme.breakpoints.down('xs')]: {
      fontSize: 15,
      padding: '0 0 0 0',
      paddingRight: 2,
    },
    [theme.breakpoints.down('300')]: {
      fontSize: 10,
    },
  },
}));

const NavBar = ({history, title}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar className={classes.bar}>
          <Typography className={classes.title}>{title}</Typography>
          <Button
            className={classes.button}
            color="inherit"
            onClick={() => history.push('/dashboard')}>
            Dashboard
          </Button>
          <Button
            className={classes.button}
            color="inherit"
            onClick={() => {
              if (!isAuth()) {
                history.push('/signin');
              } else {
                logout();
                history.push('/');
              }
            }}>
            {isAuth() ? 'Logout' : 'Login'}
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default withRouter(NavBar);
