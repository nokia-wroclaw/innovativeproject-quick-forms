import io from 'socket.io-client';
import React, {Component} from 'react';
import {GetForm} from '../FormsHandling';
import FormStep from './FormStep';
import EndStep from './EndStep';
import {LockStep} from './LockStep';
import { v4 as uuidv4 } from 'uuid';

let socketConnection;
const ENDPOINT = process.env.REACT_APP_SERVER_API_URL;

const generatePendingFormID = () => {
  return uuidv4();
};

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
      socketResponse: '',
    };
  }
  nextStep = () => {
    const {step} = this.state;
    this.setState({
      step: step + 1,
    });
    window.localStorage.setItem('step', (step + 1).toString());
  };

  previousStep = () => {
    const {step} = this.state;
    if (step > 0){
      this.setState({
        step: 1,
      });
      window.localStorage.setItem('step', (step - 1).toString());
    }
  };

  componentDidMount() {
    const {step} = this.state;
    if(!window.localStorage.getItem('step'))
      window.localStorage.setItem('step', this.state.step.toString());

    this.setState({
      step : parseInt(window.localStorage.getItem('step'), 10)
    })
    
    if (!window.localStorage.getItem('keyID')){
      const UUID = generatePendingFormID();
      console.log('empty');
      window.localStorage.setItem('keyID', UUID);
      this.setState({filledFormNumberID: UUID});
    }
    else {
      this.setState({filledFormNumberID : window.localStorage.getItem('keyID')});
    }


    socketConnection = io.connect(ENDPOINT);
    socketConnection.on('pendingFormID', data => {
      console.log(data);
      this.setState({socketResponse: data});
    });

    if (this.state.socketResponse.message === 'rejected') this.previousStep();

    const id = this.props.match.params.formID;
    this.setState({formID: id});
    this.LoadSchema(id).then(r => console.log(r));
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.socketResponse.message === 'rejected') {
      this.setState({socketResponse: ''}, this.previousStep());
    }

    if (this.state.socketResponse.message === 'accepted')
      this.setState({socketResponse: ''}, this.nextStep());
  }

  LoadSchema = formID =>
    GetForm(formID, '/api/forms/templates/')
      .then(response => this.setState({formScheme: response.data}))
      .catch(error => console.error(`Błąd pobierania schematu: ${error}`));

  promisedSetState = newState => {
    return new Promise(resolve => {
      this.setState(newState, () => {
        resolve();
      });
    });
  };

  handleSubmitSocket = async ({formData}) => {
    const pendingFormData = {
      dataForm: formData,
      templateID: this.state.formID,
      userID: this.state.formScheme.userID,
      filledFormNumberID: this.state.filledFormNumberID,
    };
    await this.promisedSetState({pendingFormData: pendingFormData});
    socketConnection.emit(`pendingFormID`, this.state.pendingFormData);
  };

  render() {
    const {step} = this.state;

    const {
      formScheme,
      formID,
      formDefault,
      filledFormNumberID,
      pendingFormData,
    } = this.state;
    const values = {
      formScheme,
      formID,
      formDefault,
      filledFormNumberID,
      pendingFormData,
    };
    switch (step) {
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
        return <LockStep filledFormNumberID={this.state.filledFormNumberID} />;
      case 3:
        return <EndStep />;
      default:
        return <h1>error </h1>;
    }
  }
}
export default UserForms;
