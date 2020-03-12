import React, { Component } from 'react'

import Form from "react-jsonschema-form";

const schema = {
    title: "Test",
    type: "object",
    required: ["Name", "Surname"],
    properties: {
      Name: {type: "string", title: "Imie", default: "Jan"},
      Surname: {type: "string", title: "Nazwisko", default:"Kowalski"},
      done: {type: "boolean", title: "Done?", default: false},
    }
  };



const onSubmit = ({formData}, e) => console.log("Data submitted: ",  formData);


export class UserForms extends Component {
    render() {
        return (
            <Form schema={schema} onSubmit={onSubmit} />
        )
    }
}
export default UserForms
