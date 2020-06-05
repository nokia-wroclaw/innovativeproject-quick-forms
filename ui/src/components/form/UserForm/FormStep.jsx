import React, {useEffect, useState} from 'react';
import {Button, Container} from '@material-ui/core';
import {withTheme} from 'react-jsonschema-form';
import {Theme as MuiTheme} from 'rjsf-material-ui';

const Form = withTheme(MuiTheme);

export function FormStep(props) {
  const [currentFormData, setCurrentFormData] = useState({});

  const nextStep = formData => {
    setCurrentFormData(formData.formData);
    console.log(formData.formData);
    props.socketEmitStatusEditOnSubmit(formData);
    props.nextStep();
    return false;
  };

  useEffect(() => {
    const data = currentFormData
    console.log(data);
    if (data !== null && data !== undefined) {
      setCurrentFormData(data);
    }
  }, []);

  return (
    <Container ms={8}>
      <Form
        schema={props.values.formScheme}
        formData={currentFormData}
        onSubmit={nextStep}>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default FormStep;
