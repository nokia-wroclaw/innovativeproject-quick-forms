import React, { Component } from 'react'
import { withTheme } from 'react-jsonschema-form';
import { Theme as MuiTheme } from 'rjsf-material-ui';
import { Button, Container } from '@material-ui/core';
import axios from 'axios';

const Form = withTheme(MuiTheme);


const onSubmit = ({formData}) => {
  console.log("Data submitted: ",  formData);
  axios.post('./api/forms/create', formData)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};



export class UserForms extends Component {
  constructor(props) {
    super(props);
    this.state = {
        form: {}
    }
  } 

  componentDidMount () {
    axios.get('./api/forms/5e738e611c9d4400008103ca')
    .then((response) => {
      this.setState({form: response.data});
    })
    .catch ((error) => {
      // handle error
      console.log(error);
    })
  }

    render() {
        return (
          <Container ms={8}>
            <Form schema={this.state.form} onSubmit={onSubmit} >
              <Button variant="contained" color="primary" type="submit">Submit</Button>
            </Form>
          </Container>
        )
    }
}
export default UserForms
