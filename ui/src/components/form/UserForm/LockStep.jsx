import React, {Component} from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import {Container, Typography} from '@material-ui/core';

export class LockStep extends Component {
  render() {
    return (
      <Container ms={8}>
        <Typography variant={'h3'} align={'center'}>
          Your submission number: {this.props.filledFormNumberID}
        </Typography>
        <LinearProgress color="secondary" />
      </Container>
    );
  }
}
