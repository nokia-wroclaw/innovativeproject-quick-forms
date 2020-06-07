import io from 'socket.io-client';
import React, {Component} from 'react';
import {GetForm} from '../FormsHandling';
import FormStep from './FormStep';
import EndStep from './EndStep';
import {LockStep} from './LockStep';
import {COMMAND_STATES, FORM_STATES} from './StatesEnum';
import {GetFormFromDatabase} from "./GetFormFromDatabase";

let socketConnection;
const ENDPOINT = process.env.REACT_APP_SERVER_API_URL;

export class UserForms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      formScheme: {},
      filledFormNumberID: -1,
      socketResponse: '',
      templateID: '',
      formData: {},
      feedbackOnReject: ''
    };
  }

  nextStep = () => {
    const {step} = this.state;
    this.setState({
      step: step + 1,
    });
    this.socketEmitStatusUpdate(step + 1);
  };

  previousStep = () => {
      this.setState({
        step: 1,
      });
      this.socketEmitStatusUpdate(1);
  };

  socketEmitStatusUpdate = (step) => {
    const command = COMMAND_STATES.UPDATE;
    const pendingFormData = {
      filledFormNumberID: this.getPendingFormID(),
      state: step
    }

    const dataToSend = [command, pendingFormData];

    socketConnection.emit(
        `pendingFormID`,
        dataToSend
    );
  }

  socketEmitStatusEditOnSubmit = async ({formData}) => {
    const command = COMMAND_STATES.EDIT;
    const pendingFormData = {
      dataForm:  formData,
      templateID: this.getTemplateFormID(),
      userID: this.state.formScheme.userID,
      filledFormNumberID: this.getPendingFormID(),
      state: FORM_STATES.PENDING
    };

    await this.promisedSetState({pendingFormData: pendingFormData}); //check if it's needed
    const dataToSend = [command, pendingFormData];

    socketConnection.emit(
        `pendingFormID`,
        dataToSend
    );
  }

  socketEmitStatusCreate = () => {
    const command = COMMAND_STATES.CREATE;
    const data = {
      filledFormNumberID: this.getPendingFormID(),
      state: FORM_STATES.TOBEFILLED
    }

    const dataToSend = [command, data]
    socketConnection.emit(
        'pendingFormID',
        dataToSend
    )
  }

  socketListenToServer = () => {
    socketConnection.on('pendingFormID', data => {
      this.setState({socketResponse: data});
    });
  }

  socketConnect = () => {
    socketConnection = io.connect(ENDPOINT);
  }

  getPendingFormID = () => {
    const urlData = window.location.href.split('/');
    return urlData[urlData.length - 1];
  }

  getTemplateFormID = () => {
    const urlData = window.location.href.split('/');
    return urlData[urlData.length - 2];
  }

  handleLoadSchema = () => {
    const id = this.props.match.params.formID;
    this.setState({templateID: id});
    this.LoadSchema(id).then(r => console.log(r));
}

  LoadSchema = formID =>
      GetForm(formID, '/api/forms/templates/')
          .then(response => {
            this.setState({formScheme: response.data})
          })
          .catch(error => console.error(`Błąd pobierania schematu: ${error}`));

  mountStep =  () => {
    GetFormFromDatabase(this.getPendingFormID())
        .then(res => this.mountDataFromDatabase(res));
      this.socketEmitStatusCreate();
  }

  mountDataFromDatabase =  (response) => {
    if (response.data !== null){
      if (response.data.state !== null) {
         this.setState({step: response.data.state})
      }
      if (response.data.dataForm !== null){
         this.setState({formData: response.data.dataForm})
      }
    }
  }

  componentDidMount() {
    this.handleLoadSchema();
    this.socketConnect();
    this.socketListenToServer();
    this.setState({filledFormNumberID: this.getPendingFormID()});
    this.mountStep();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.socketResponse.message === COMMAND_STATES.REJECT) {
      this.setState({feedbackOnReject: this.state.socketResponse.feedbackMessage})
      this.setState({socketResponse: ''})

      this.previousStep();
      GetFormFromDatabase(this.getPendingFormID())
          .then(res => this.mountDataFromDatabase(res));
    }

    if (this.state.socketResponse.message === COMMAND_STATES.ACCEPT){
      this.setState({socketResponse: ''})
      this.nextStep();
    }

  }

  promisedSetState = newState => {
    return new Promise(resolve => {
      this.setState(newState, () => {
        resolve();
      });
    });
  };

  render() {
    const step = this.state.step;
    const {
      formScheme,
      templateID,
      filledFormNumberID,
      formData,
    } = this.state;
    const values = {
      formScheme,
      templateID,
      filledFormNumberID,
      formData,
      step
    };
    switch (step) {
      case 1:
        return (
          <FormStep
              feedbackOnReject={this.state.feedbackOnReject}
            socketEmitStatusEditOnSubmit={this.socketEmitStatusEditOnSubmit}
            nextStep={this.nextStep}
            values={values}
            getPendingFormID={this.getPendingFormID}
          />
        );
      case 2:
        return <LockStep filledFormNumberID={this.state.filledFormNumberID}
                         previousStep={this.previousStep}/>;
      case 3:
        return <EndStep templateID={this.state.formID} />;
      default:
        return <h1>error </h1>;
    }
  }
}
export default UserForms;
