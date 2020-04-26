import React, {Component} from 'react';
import {withTheme} from 'react-jsonschema-form';
import {Theme as MuiTheme} from 'rjsf-material-ui';
import {Button, Container} from '@material-ui/core';
import {SubmitForm, GetForm} from './FormsHandling';

const Form = withTheme(MuiTheme);

export class UserForms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formScheme: {},
      formID: '',
      formDefault: '',
    };
  }

  componentDidMount() {
    let id = this.props.match.params.formID;
    this.setState({formID: id});
    this.LoadSchema(id);
  }

  LoadSchema = formID =>
    GetForm(formID, '/api/forms/templates/')
      .then(response => this.setState({formScheme: response.data}))
      .catch(error => console.error(`Błąd pobierania schematu: ${error}`));

  handleSubmit = ({formData}) =>
    SubmitForm(
      {
        dataForm: formData,
        templateID: this.state.formID,
        userID: this.state.formScheme.userID,
      },
      '/api/forms/pendingforms/'
    )
      .then(() => window.location.replace('/'))
      .catch(error => console.error(`Sumbit error:${error}`));

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
