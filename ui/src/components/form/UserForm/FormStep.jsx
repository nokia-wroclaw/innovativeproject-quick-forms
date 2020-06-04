import React, {useEffect, useState} from 'react';
import {Button, Container} from '@material-ui/core';
import {withTheme} from 'react-jsonschema-form';
import {Theme as MuiTheme} from 'rjsf-material-ui';

const Form = withTheme(MuiTheme);

export function FormStep(props) {
  const [formData, setFormData] = useState({});

  const nextStep = formData => {
    console.log(formData);
    props.handleSubmitSocket(formData);
    props.nextStep();
    return false;
  };

  useEffect(() => {
    const data = JSON.parse(
      window.localStorage.getItem(`data_${props.getPendingFormID()}`)
    );
    console.log(data);
    if (data != null) {
      setFormData(data);
    }
  }, []);

  return (
    <Container ms={8}>
      <Form
        schema={props.values.formScheme}
        formData={formData}
        onSubmit={nextStep}>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default FormStep;
