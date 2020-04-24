import React from 'react';
import PendingForms from './PendingForms';
import AcceptedForms from './AcceptedForms';



class ListOfFilledForms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filledForms: [],
    };
  }

  render() {
    return (
      <div>
        <PendingForms formID={this.props.match.params}></PendingForms>
        <AcceptedForms formID={this.props.match.params}></AcceptedForms>
      </div>
    );
  }
}

export default ListOfFilledForms;
