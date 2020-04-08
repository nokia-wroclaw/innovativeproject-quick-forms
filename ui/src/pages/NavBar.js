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
    padding: '20px',
    margin: '10px',
  },
  bar: {
    background: 'linear-gradient(to right, #2980b9, #6dd5fa)',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  buttons: {
    margin: '20px',
  },
}));

const NavBar = ({history, title}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.bar} position="static">
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            {title}
          </Typography>
          <Button
            className={classes.buttons}
            color="inherit"
            onClick={() => history.push('/dashboard')}
          >
            Dashboard
          </Button>
          <Button
            className={classes.buttons}
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
