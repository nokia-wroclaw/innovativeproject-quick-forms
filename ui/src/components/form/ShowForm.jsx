import React from 'react';
import GetForm from './GetForm';
import {Container} from '@material-ui/core';

class ShowForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formSchema: {},
    };
  }

  componentDidMount() {
    const {formID} = this.props.match.params;
    this.LoadSchema(formID);
  }

  LoadSchema = formID =>
    GetForm(formID, '/api/forms/templates/').then(response =>
      this.setState({formSchema: response.data})
    );

  render() {
    return (
      <Container ms={8}>
        <div>{JSON.stringify(this.state.formSchema, null, 2)}</div>
      </Container>
    );
  }
}

export default ShowForm;
