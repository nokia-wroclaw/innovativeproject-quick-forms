import React from 'react';
import axios from 'axios';
import GetForm from "../GetForm/GetForm";

class SingleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {},
    };
  }

  componentDidMount() {
    const { formID } = this.props.match.params;
    GetForm(formID).then(res =>this.setState({form : res}));
  }

  render() {
    return (
      <div className="singleForm.component">
        <pre>{JSON.stringify(this.state.form, null, 2)}</pre>
      </div>
    );
  }
}

export default SingleForm;
