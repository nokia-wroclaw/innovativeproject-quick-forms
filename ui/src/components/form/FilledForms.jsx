import React from 'react';
import GetForm from './GetForm';
import {Button} from '@material-ui/core';

class ListOfFilledForms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filledForms: [],
    };
  }

  componentDidMount() {
    const {templateID} = this.props.match.params;
    this.LoadSchema(templateID);
  }

  LoadSchema = templateID =>
    GetForm(templateID, '/api/forms/filled-forms')
      .then(response => this.setState({filledForms: response.data}))
      .catch(error => console.error(`Błąd pobierania danego template:${error}`));

  _render(obj) {
    return (
      <div key={obj._id}>
        {obj._id}:&nbsp;
        {JSON.stringify(obj.dataForm, null, 2)}
      </div>
    );
  }

  render() {
    return <div> {this.state.filledForms.map(i => this._render(i))}</div>;
  }
}

export default ListOfFilledForms;
