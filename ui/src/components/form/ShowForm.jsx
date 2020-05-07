import React from 'react';
import {GetForm} from './FormsHandling';
import {withTheme} from 'react-jsonschema-form';
import {Theme as MuiTheme} from 'rjsf-material-ui';
import {Button, Container} from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import Popup from 'reactjs-popup';

const Form = withTheme(MuiTheme);

class ShowForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filledForm: {},
      formSchema: {},
      isLoading: true,
      open: false,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({open: true});
  }
  closeModal() {
    this.setState({open: false});
  }

  componentDidMount() {
    this.LoadData(this.props.idOfForm, this.props.path, this.props.template);
  }

  LoadData = (formID, path, templateID) => {
    GetForm(formID, `/api/forms/${path}`)
      .then(response => this.setState({filledForm: response.data}))
      .catch(error =>
        console.error(`Bląd pobierania wypelnionych danych: ${error}`)
      )
      .then(response => GetForm(templateID, '/api/forms/templates'))
      .then(response => this.setState({formSchema: response.data}))
      .then(() => this.setState({isLoading: false}))
      .catch(error => console.error(`Bląd pobierania template: ${error}`));
  };

  render() {
    let {isLoading} = this.state;
    return (
      <Popup
        open={this.state.open}
        closeOnDocumentClick
        onClose={this.closeModal}>
        <Container>
          {!isLoading ? (
            <Form
              formData={this.state.filledForm.dataForm}
              disabled={true}
              schema={this.state.formSchema}>
              <Button display="none" />
            </Form>
          ) : (
            <LinearProgress variant="query" />
          )}
        </Container>
      </Popup>
    );
  }
}

export default ShowForm;
