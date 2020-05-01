import React, {Component} from 'react'
import io from 'socket.io-client';
import {Button, Container} from "@material-ui/core";
import {withTheme} from "react-jsonschema-form";
import {Theme as MuiTheme} from "rjsf-material-ui";

const Form = withTheme(MuiTheme);
const ENDPOINT = 'http://localhost:8080';

export class FormStep extends Component{
    continue =  (formData) => {
        console.log(this.props.values.formScheme._id);
        console.log(this.props.values.formScheme.userID)
        const socketConnection = io.connect(ENDPOINT);
        socketConnection.on('pendingFormID', (data) => {
            console.log('?');
            console.log(data);
        })
        socketConnection.emit('pendingFormID', {
            schemeFormData : formData,
            filledFormNumberID : this.props.values.filledFormNumberID,
            filledFormData : formData.formData,
            ownerID : this.props.values.formScheme.userID,
            templateFormID : this.props.values.formScheme._id
        })
        this.props.handleSubmit(formData);
        this.props.nextStep();
    }

    render(){
        const{ values } = this.props;
        return(
            <Container ms={8}>
                <Form schema={values.formScheme} onSubmit={this.continue}>
                    <Button variant="contained" color="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Container>
            )
    }
}

export default FormStep;