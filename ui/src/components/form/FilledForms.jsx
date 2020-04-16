import React from 'react';
import GetForm from './GetForm';

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
    GetForm(templateID, '/api/forms/filled-forms').then(response => {
      console.log(templateID);
      console.log(response.data);
      this.setState({filledForms : response.data})}
    );
    
    _render(obj){
      return <code>{JSON.stringify(obj, null, 2)}</code>
   }

    render() {
      return (
        this.state.filledForms.map(i => this._render(i.dataForm)));
    }
}

export default ListOfFilledForms;
