import React, {useEffect, useState} from 'react';
import {Button, Container} from '@material-ui/core';
import {withTheme} from 'react-jsonschema-form';
import {Theme as MuiTheme} from 'rjsf-material-ui';
import {useInputChange} from "./UseInputChange";

const Form = withTheme(MuiTheme);

export function FormStep(props) {
  const [formData, setFormData] = useState({});

 const nextStep  = formData => {
    props.handleSubmitSocket(formData);
    props.nextStep();
    return false;
  };

  useEffect(() => {
      const data = JSON.parse(window.localStorage.getItem('data'));
      if (data != null) {
        console.log(data.dataForm)
        setFormData(data.dataForm)
      }
  },[])

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
