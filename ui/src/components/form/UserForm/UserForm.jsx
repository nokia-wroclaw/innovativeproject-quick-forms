import io from 'socket.io-client';
import React, {Component} from 'react';
import {withTheme} from 'react-jsonschema-form';
import {Theme as MuiTheme} from 'rjsf-material-ui';
import {Button, Container} from '@material-ui/core';
import {SubmitForm, GetForm} from '../FormsHandling';
import FormStep from "./FormStep";
import EndStep from "./EndStep";

const Form = withTheme(MuiTheme);

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
        filledFormData: {},
      formID: '',
      formDefault: '',
        idOfPending: '',
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
    const id = this.props.match.params.formID;
    this.setState({filledFormNumberID: pendingFormIDGenerator()})
    this.setState({formID: id});
     this.LoadSchema(id);
  }

  LoadSchema = formID =>
    GetForm(formID, '/api/forms/templates/')
      .then(response => this.setState({formScheme: response.data}))
      .catch(error => console.error(`Błąd pobierania schematu: ${error}`));


   handleSubmit =  async ({formData}) => {
      await this.setState({filledFormData: formData})
       console.log(this.state.filledFormData);
       SubmitForm( //submit form socket here
           {
               dataForm: this.state.filledFormData,
               templateID: this.state.formID,
               userID: this.state.formScheme.userID,
               filledFormNumberID: this.state.filledFormNumberID,
           },
           '/api/forms/pendingforms/'
       ) .then(res => {
               console.log(res)
           }
       )
           .catch(error => console.error(`Sumbit error:${error}`));
   }


  render() {
      const { step } = this.state;

      const {formScheme, formID, formDefault, filledFormNumberID, filledFormData} = this.state;
      const values = {formScheme, formID, formDefault, filledFormNumberID, filledFormData};
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
