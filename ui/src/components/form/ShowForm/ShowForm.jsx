import React from 'react';
import axios from 'axios';
import GetForm from '../GetForm/GetForm';
import MuiForm, {Theme as MuiTheme} from 'rjsf-material-ui';
import {Container} from '@material-ui/core';
import {withTheme} from 'react-jsonschema-form';

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
