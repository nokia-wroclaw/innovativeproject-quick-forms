import React, {Component} from 'react';
import {Button, Container} from '@material-ui/core';
import {withTheme} from 'react-jsonschema-form';
import {Theme as MuiTheme} from 'rjsf-material-ui';

const Form = withTheme(MuiTheme);

export class FormStep extends Component {
  continue = formData => {
    this.props.handleSubmitSocket(formData);
    this.props.nextStep();
    return false;
  };

  render() {
    const {values} = this.props;
    console.log(this.props.show);
    return (
      <Container ms={8}>
        <Form
          schema={values.formScheme}
          formData={values.pendingFormData.dataForm}
          onSubmit={this.continue}>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}

export default FormStep;
