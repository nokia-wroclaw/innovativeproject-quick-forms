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

  render() {

    /// Zrobic tu jakiegos foreach'a i ubrac to w material ui cnie <3 dla cb.
    return (
        <div> 
        {JSON.stringify(this.state.filledForms[0], null, 2)}
        <br></br>
        {JSON.stringify(this.state.filledForms[1], null, 2)}
        <br></br>
        {JSON.stringify(this.state.filledForms[2], null, 2)}
        </div>
    );
  }
}

export default ListOfFilledForms;
