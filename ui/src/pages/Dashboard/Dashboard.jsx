import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import ListOfForms from '../../components/form/ListOfForms/ListOfForms';
import NavBar from '../NavBar';
import {Button, Container} from '@material-ui/core';

const useStyles = () => ({
  root: {
    display: 'block',
    alignItems: 'center',
  },
  buttonStyle: {
    padding: '10px',
    margin: '10px',
    alignItems: 'center',
  },
});

class Dashboard extends React.Component {
  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <NavBar title="My forms" />

        <Container maxWidth="md">
          <Button
            className={classes.buttonStyle}
            variant="contained"
            color="primary"
          >
            Create a new form
          </Button>
          <ListOfForms />
        </Container>
      </div>
    );
  }
}

export default withStyles(useStyles)(Dashboard);
