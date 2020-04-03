import React from 'react';
import GetForm from '../GetForm/GetForm';
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
    console.log(formID);
    GetForm(formID).then(res => this.setState({formSchema: res}));
  }

  render() {
    return (
      <Container ms={8}>
        <ShowForm schema={this.state.formSchema} />
      </Container>
    );
  }
}

export default ShowForm;
