import io from 'socket.io-client';
import React, {Component} from 'react';
import {withTheme} from 'react-jsonschema-form';
import {Theme as MuiTheme} from 'rjsf-material-ui';
import {Button, Container} from '@material-ui/core';
import {SubmitForm, GetForm} from '../FormsHandling';
import FormStep from "./FormStep";
import EndStep from "./EndStep";

const Form = withTheme(MuiTheme);
const socketConnection = io.connect('http://localhost:8080');


export class UserForms extends Component {
  constructor(props) {
    super(props);
    this.state = {
        step: 1,
      formScheme: {},
      formID: '',
      formDefault: '',

    };
  }

    nextStep = () => {
        const { step } = this.state;
        this.setState({
            step: step + 1
        });
    }

    previousStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1
        });
    }


  componentDidMount() {
    const id = this.props.match.params.formID;
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
    ) .then(formData => console.log(formData))
      .catch(error => console.error(`Sumbit error:${error}`));

  render() {
      const { step } = this.state;
      console.log(step)
      const {formScheme, formID, formDefault} = this.state;
      const values = {formScheme, formID, formDefault};

      switch(step){
          case 1:
          return (
              <FormStep
                  handleSubmit={this.handleSubmit}
                  nextStep={this.nextStep}
                  values={values}
                  />
          );
          case 2:
              return(
                  <div>
                      <h1> Screen is locked, please wait for Template Owner to accept your submit</h1>
                      <Button variant="contained" color="primary" type="submit" onClick={this.nextStep}>
                          Continue
                      </Button>
                  </div>

              );
          case 3:
              return(
                  <EndStep/>
              );

      }

  }
}
export default UserForms;
