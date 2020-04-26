import React from 'react';
import PendingForms from './PendingForms';
import AcceptedForms from './AcceptedForms';
import { GetForm } from './FormsHandling';

class ListOfFilledForms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      acceptedForms: [],
      pendingForms: [],
      templateid: ''
    };
  }

  componentDidMount() {
    const templateID = this.props.match.params.templateID;
    this.setState({ templateid: templateID });
    this.LoadSchema(templateID);
  }

  LoadSchema = templateID => {
    GetForm(templateID, '/api/forms/pendingforms')
      .then(response => this.setState({ pendingForms: response.data }))
      .catch(error => console.error(`Błąd pobierania danego pending formsow:${error}`));
      
    GetForm(templateID, '/api/forms/filled-forms')
      .then(response => this.setState({ acceptedForms: response.data }))
      .catch(error => console.error(`Błąd pobierania danego pending formsow:${error}`));
  }

  render() {
    return (
      <div>
        <PendingForms formID={this.state.templateid} listOfForms={this.state.pendingForms} reload={this.LoadSchema} />
        <AcceptedForms formID={this.state.templateid} listOfForms={this.state.acceptedForms} reload={this.LoadSchema} />
      </div>
    );
  }
}

export default ListOfFilledForms;
