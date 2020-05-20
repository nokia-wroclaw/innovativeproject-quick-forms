import React from 'react'
import { withTheme } from 'react-jsonschema-form';
import { Theme as MuiTheme } from 'rjsf-material-ui';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
      marginLeft: 10,
    },
  }));

const Form = withTheme(MuiTheme);

export default function FormPreview(params) {
    const classes = useStyles();

    return (
      <div className={classes.root}>
        <Form schema={params.formscheme} />
      </div>
    );
}