import React from 'react';
import {Button, Container} from '@material-ui/core';
import {withTheme} from 'react-jsonschema-form';
import {Theme as MuiTheme} from 'rjsf-material-ui';

const Form = withTheme(MuiTheme);

export function FormStep(props) {

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
      <h1>{props.feedbackOnReject}</h1>
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
