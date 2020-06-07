import React, {Component} from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import {Button, Container, Typography} from '@material-ui/core';

export class LockStep extends Component {
    previousStep = () => {
        this.props.previousStep()
    }


  render() {
    return (
      <Container ms={8}>
        <Typography variant={'h3'} align={'center'}>
          Your submission number: {(this.props.filledFormNumberID).toString().slice(-4).toUpperCase()}
        </Typography>
        <LinearProgress color="secondary" />
          <Button variant="contained" color="primary" type="submit"
                  onClick={this.previousStep}>
              Back to edition
          </Button>
          <Button variant="contained" color="primary" type="submit">
              Preview
          </Button>
      </Container>
    );
  }
}
