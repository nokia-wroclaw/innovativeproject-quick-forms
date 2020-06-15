import React from 'react';
import {Button, Container} from '@material-ui/core';
import {withTheme} from 'react-jsonschema-form';
import {Theme as MuiTheme} from 'rjsf-material-ui';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  feedbackInfo: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const Form = withTheme(MuiTheme);

export function FormStep(props) {
  const classes = useStyles();

  const nextStep = (formData) => {
    updateData(formData)
    props.nextStep();
  };

  const updateData = (formData) => {
      props.socketEmitStatusEditOnSubmit(formData);
      props.setFormDataState(formData)
  }

  return (
    <Container ms={8}>
      {props.feedbackOnReject &&
        <Alert
          className={classes.feedbackInfo}
          severity="info"
        >
          <AlertTitle>Your submit has been rejected because:</AlertTitle>
          {props.feedbackOnReject}
        </Alert>
      }
      <Form
        schema={props.values.formScheme}
        formData={props.values.formData}
        onSubmit={nextStep}>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default FormStep;
