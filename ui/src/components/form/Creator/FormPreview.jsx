import React from 'react'
import { withTheme } from 'react-jsonschema-form';
import { Theme as MuiTheme } from 'rjsf-material-ui';

const Form = withTheme(MuiTheme);

export default function FormPreview(params) {

    return(
    <Form schema={params.formscheme} />
    );
}