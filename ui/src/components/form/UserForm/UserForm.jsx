import React, { Component } from 'react'
import { withTheme } from 'react-jsonschema-form';
import { Theme as MuiTheme } from 'rjsf-material-ui';
import { Button, Container } from '@material-ui/core';
import axios from 'axios';
import Submit from '../SubmitForm/SubmitForm'


const Form = withTheme(MuiTheme);

export class UserForms extends Component {
  constructor(props) {
    super(props);
    this.state = {
        form: {}
    }
  } 

  componentDidMount () {
    axios.get('/api/forms/5e738e611c9d4400008103ca')
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
            <Form schema={this.state.form} onSubmit={Submit} >
              <Button variant="contained" color="primary" type="submit">Submit</Button>
            </Form>
          </Container>
        )
    }
}
export default UserForms
