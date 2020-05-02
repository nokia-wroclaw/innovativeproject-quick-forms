import io from 'socket.io-client';
import React, {Component} from 'react';
import {withTheme} from 'react-jsonschema-form';
import {Theme as MuiTheme} from 'rjsf-material-ui';
import {Button, Container} from '@material-ui/core';
import {SubmitForm, GetForm} from '../FormsHandling';
import FormStep from "./FormStep";
import EndStep from "./EndStep";

const Form = withTheme(MuiTheme);
let socketConnection;
const ENDPOINT = '//localhost:8080';

const pendingFormIDGenerator = () => {
    const SEED = 1000000000;
    return Math.floor(((Math.random() * SEED)) + SEED).toString();
}

export class UserForms extends Component {
  constructor(props) {
    super(props);
    this.state = {
        step: 1,
      formScheme: {},
        pendingFormData: {},
      formID: '',
      formDefault: '',
        filledFormNumberID: -1,

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
      socketConnection = io.connect(ENDPOINT);
    const id = this.props.match.params.formID;
    this.setState({formID: id});
    this.setState({filledFormNumberID : pendingFormIDGenerator()})
     this.LoadSchema(id).then(r => console.log(r));
  }

  LoadSchema = formID =>
    GetForm(formID, '/api/forms/templates/')
      .then(response => this.setState({formScheme: response.data}))
      .catch(error => console.error(`Błąd pobierania schematu: ${error}`));

    promisedSetState = (newState) => {
        return new Promise((resolve) => {
            this.setState(newState, () => {
                resolve()
            });
        });
    }

     handleSubmitSocket  = async ({formData}) => {
        const pendingFormData = {
             dataForm: formData,
             templateID: this.state.formID,
             userID: this.state.formScheme.userID,
             filledFormNumberID: this.state.filledFormNumberID,
         }
         await this.promisedSetState({pendingFormData : pendingFormData})
         console.log(this.state.pendingFormData)
         console.log(pendingFormData)
         console.log(formData)
         console.log(this.state.formID)

         socketConnection.emit(`pendingFormID`, this.state.pendingFormData)
     }

  render() {
      const { step } = this.state;

      const {formScheme, formID, formDefault, filledFormNumberID, pendingFormData} = this.state;
      const values = {formScheme, formID, formDefault, filledFormNumberID, pendingFormData};
      switch(step){
          case 1:
          return (
              <FormStep
                  handleSubmitSocket={this.handleSubmitSocket}
                  handleSubmit={this.handleSubmit}
                  nextStep={this.nextStep}
                  values={values}
                  />
          );
          case 2:
              return(
                  <div>
                      <h1>{this.state.filledFormNumberID}</h1>
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
