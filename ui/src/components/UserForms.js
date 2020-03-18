import React, { Component } from 'react'

import { withTheme } from 'react-jsonschema-form';
import { Theme as MuiTheme } from 'rjsf-material-ui';
import { Button } from '@material-ui/core';

const Form = withTheme(MuiTheme);

const schema = {
  "title": "A registration form",
  "description": "A simple form example.",
  "type": "object",
  "required": [
    "firstName",
    "lastName"
  ],
  "properties": {
    "firstName": {
      "type": "string",
      "title": "First name"
    },
    "lastName": {
      "type": "string",
      "title": "Last name"
    },
    "age": {
      "type": "integer",
      "title": "Age"
    },
    "bio": {
      "type": "string",
      "title": "Bio"
    },
    "password": {
      "type": "string",
      "title": "Password",
      "minLength": 3
    },
    "telephone": {
      "type": "string",
      "title": "Telephone",
      "minLength": 10
    }
  }
};


const onSubmit = ({formData}, e) => console.log("Data submitted: ",  formData);


export class UserForms extends Component {
    render() {
        return (
            <Form schema={schema} onSubmit={onSubmit} >
              <Button variant="contained" color="primary" type="submit">Submit</Button>
            </Form>
        )
    }
}
export default UserForms
