import React, {Component} from 'react';
import {withTheme} from 'react-jsonschema-form';
import {Theme as MuiTheme} from 'rjsf-material-ui';
import {Button, Container} from '@material-ui/core';
import SubmitForm from '../SubmitForm/SubmitForm';
import GetForm from '../GetForm/GetForm';
const Form = withTheme(MuiTheme);

export class UserForms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formScheme: {},
    };
  }

  componentDidMount() {
    const {formID} = this.props.match.params;
    this.LoadSchema(formID);
  }

  LoadSchema = formID =>
    GetForm(formID, '/api/forms/templates/').then(response =>
      this.setState({formScheme: response.data.template})
    );

  handleSubmit = ({formData}) =>
    SubmitForm(formData, '/api/forms/filled-forms/');

  render() {
    return (
      <Container ms={8}>
        <Form schema={this.state.formScheme} onSubmit={this.handleSubmit}>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}
export default UserForms;
