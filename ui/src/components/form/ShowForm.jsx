import React from 'react';
import {GetForm} from './FormsHandling';
import {Container} from '@material-ui/core';

class ShowForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
    };
  }

  componentDidMount() {
    const {formID} = this.props.match.params;
    this.LoadSchema(formID);
  }

  LoadSchema = formID =>
    GetForm(formID, '/api/forms/pendingforms/single/')
      .then(response => this.setState({formData: response.data}))
      .catch(error => console.error(`Bląd pobierania template: ${error}`));

  render() {
    return (
      <Container ms={8}>
        {JSON.stringify(this.state.formData, null, '\t')}
      </Container>
    );
  }
}

export default ShowForm;
