import React, {Component} from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import {Button, Container, Typography} from '@material-ui/core';
// import PendingFormPreview from "./PendingFormPreview";
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';

const useStyles = theme => ({
  button: {
    marginTop: 30,
    marginLeft: 3,
    marginRight: 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  grid: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 

class LockStep extends Component {
    previousStep = () => {
        this.props.previousStep()
    }


  render() {
    const {classes} = this.props;
    return (
      <Container ms={8}>
        <Typography variant={'h3'} align={'center'}>
          Your submission number:{' '}
          {this.props.filledFormNumberID
            .toString()
            .slice(-4)
            .toUpperCase()}
        </Typography>
        <LinearProgress color="secondary" />
        <Grid container className={classes.grid}>
          <Grid item>
            <Button className={classes.button} variant="contained" color="primary" type="submit"
                    onClick={this.previousStep}>
                Back to edition
            </Button>
          </Grid>
          {/* <Grid item>
            <PendingFormPreview
              formSchema={this.props.values.formScheme}
              formData={this.props.values.formData}
            />
          </Grid> */}
        </Grid>
      </Container>
    );
  }
}

export default withStyles(useStyles)(LockStep);
