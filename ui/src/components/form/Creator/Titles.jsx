import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    root: {
      display: 'block',
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    textfield: {
      display: 'flex',
      maxWidth: 400,
    },
    submit: {
      width: 257,
      borderRadius: 12,
    },
  }));
  

function Tiles(props) {
    const classes = useStyles();

    const handleSubmit = event => {
        event.preventDefault();
        const formTitle = event.target[0].value;
        const formDescription = event.target[2].value;
        const object = {
          title: formTitle,
          description: formDescription, 
        };
        props.TitleSet(object);
      };
    
    return(
    <form className={classes.root} onSubmit={handleSubmit} noValidate autoComplete="off">
        <TextField
        label="Form Title"
        defaultValue="Form"
        variant="outlined"
        />
        <TextField
        label="Form description"
        defaultValue=""
        variant="outlined"
        />
        <Button className={classes.submit} type="submit" variant="contained" color="primary">
            Set
        </Button>
    </form>
  )
}


export default Tiles;