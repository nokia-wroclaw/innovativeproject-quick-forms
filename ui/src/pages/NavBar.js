import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {withRouter} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: '0px',
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
      padding: '0',
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
    },
  },
}));

const NavBar = ({history, title}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.bar}>
          <Typography className={classes.title}>
            {title}
          </Typography>
          <Button
            className={classes.button}
            color="inherit"
            onClick={() => history.push('/dashboard')}
          >
            Dashboard
          </Button>
          <Button
            className={classes.button}
            color="inherit"
            onClick={() => history.push('/signin')}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default withRouter(NavBar);
