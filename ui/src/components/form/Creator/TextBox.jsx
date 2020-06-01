import React from 'react'
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';

const types = [
  {
    value: 'string',
    label: 'text',
  },

  {
    value: 'number',
    label: 'number',
  }
];

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

function TextBox(props) {   
  const classes = useStyles();
  const [typeValue, setTypeValue] = React.useState('string');

  const handleSubmit = event => {
    event.preventDefault();
    const displayName = event.target[0].value;
    const inputType = typeValue;
    const codeName = displayName.replace(/\s/g, '');
    
    const control = {
      id:0,
      isRequired: true,
      propName: codeName, 
      data: {
        type: inputType,
        title: displayName
      },
    };
    props.Add(control);
  };

  const handleChange = event => {
    setTypeValue(event.target.value);
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit} noValidate autoComplete="off">
      <TextField className={classes.textfield} id="outlined-basic" label="Field name" variant="outlined" />
      <TextField
        className={classes.textfield}
        id="type"
        select
        label="Type"
        value={typeValue}
        onChange={handleChange}
        SelectProps={{
          native: true,
        }}
        helperText="Please select the type of the field"
        variant="outlined"
      >
        {types.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <Button className={classes.submit} type="submit" variant="contained" color="primary">
        Add
      </Button>
    </form>
  )
}

export default TextBox;