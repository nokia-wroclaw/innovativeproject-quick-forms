import React, {Component} from 'react';
import {Button, Container} from '@material-ui/core';
import {withTheme} from 'react-jsonschema-form';
import {Theme as MuiTheme} from 'rjsf-material-ui';

const Form = withTheme(MuiTheme);

export class FormStep extends Component {
  continue = formData => {
    this.props.handleSubmitSocket(formData);
    this.props.nextStep();
  };

  render() {
    const {values} = this.props;
    return (
      <Container ms={8}>
        <Form schema={values.formScheme} onSubmit={this.continue}>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}

export default FormStep;
