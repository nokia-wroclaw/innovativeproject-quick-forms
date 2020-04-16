import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import ListOfForms from '../../components/form/ListOfForms';
import NavBar from '../NavBar';
import {Button, Container} from '@material-ui/core';

const useStyles = () => ({
  root: {
    display: 'block',
    alignItems: 'center',
  },
  buttonStyle: {
    margin: '10px 10px 10px 0px',
    fontFamily: 'sans-serif',
    background: 'linear-gradient(to right, #2980b9, #6dd5fa)',
  },
});

class Dashboard extends React.Component {
  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <NavBar title="MY FORMS" />

        <Container maxWidth="md">
          <Button
            className={classes.buttonStyle}
            variant="contained"
            color="primary"
            fullWidth
          >
            Create a new form
          </Button>
        </Container>

        <Container maxWidth="xl">
          <ListOfForms />
        </Container>
      </div>
    );
  }
}

export default withStyles(useStyles)(Dashboard);
