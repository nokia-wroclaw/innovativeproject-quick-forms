import React, {Component} from 'react';
import {withTheme} from 'react-jsonschema-form';
import {Theme as MuiTheme} from 'rjsf-material-ui';
import {Button, Container} from '@material-ui/core';
import {SubmitForm, GetForm} from './FormsHandling';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import {withStyles} from '@material-ui/core/styles';

const useStyles = theme => ({
  root: {
    flexGrow: 1,
  },
  textAlign: {
    title: 'center' 
  },
  control: {
    padding: theme.spacing(2),
  },
});


const Form = withTheme(MuiTheme);

export class UserForms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formScheme: {},
      formID: '',
      formDefault: '',
      idOfPending: ''
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
      .then((res) => this.setState({idOfPending: res.data}))
      .catch(error => console.error(`Sumbit error:${error}`));

  render() {
    return (
      <Container ms={8}>
        <Card>
          <CardHeader title={`Twój kod oczekującego: ${this.state.idOfPending.substr(this.state.idOfPending.length - 5)}`}/>
          <CardContent>
            <Form schema={this.state.formScheme} onSubmit={this.handleSubmit}>
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </Form>
          </CardContent>
        </Card>
      </Container>
    );
  }
}
export default withStyles(useStyles)(UserForms);
