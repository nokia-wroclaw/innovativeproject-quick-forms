import React from 'react';
import {Button, Container} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import UserFormIDGenerator from './UserFormIDGenerator';
const useStyles = makeStyles(() => ({
  Container: {
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageCard: {
    image: `url(${require('../../../images/greenAcceptedTick.png')})`,
  },
  media: {
    position: 'relative',
    height: '33%',
    width: '33%',
    margin: 'auto',
    paddingTop: '33%',
  },
  text: {
    color: 'green',
    textAlign: 'center',
  },
  button: {
    marginTop: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export function EndStep(props) {
  const classes = useStyles();

  const toHomepage = event => {
    event.preventDefault();
    window.location.replace('/');
  };

  const toNewForm = event => {
    event.preventDefault();
    window.location.replace(`${UserFormIDGenerator()}`);
  };

  return (
    <React.Fragment>
      <h1 className={classes.text}>Your application was accepted</h1>
      <CardMedia
        className={classes.media}
        image={require('../../../images/greenAcceptedTick.png')}
        title="Accepted"
      />
      <Container className={classes.Container}>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          type="submit"
          onClick={toHomepage}>
          Navigate to homepage
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          type="submit"
          onClick={toNewForm}>
          New Form
        </Button>
      </Container>
    </React.Fragment>
  );
}

export default EndStep;
