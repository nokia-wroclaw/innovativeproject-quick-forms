import React from 'react';
import {withTheme} from 'react-jsonschema-form';
import {Theme as MuiTheme} from 'rjsf-material-ui';
import {makeStyles} from '@material-ui/core/styles';
import {Button} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    marginLeft: 10,
  },
  buttons: {
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  submit: {
    width: 175,
  },
}));

const Form = withTheme(MuiTheme);

export default function FormPreview(params) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container className={classes.buttons} spacing={2}>
        <Grid item xs="auto" sm="auto">
          <Button
            className={classes.submit}
            type="submit"
            variant="contained"
            color="secondary"
            startIcon={<RotateLeftIcon />}
            onClick={() => params.reset()}>
            Reset form
          </Button>
        </Grid>
        <Grid item xs="auto" sm="auto">
          <Button
            className={classes.submit}
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={() => params.save(params.formSchema)}>
            Save form
          </Button>
        </Grid>
      </Grid>
      <Form schema={params.formSchema} disabled={true}>
        <Button display="none" />
      </Form>
    </div>
  );
}
