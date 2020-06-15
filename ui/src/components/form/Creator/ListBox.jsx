import React, {Component} from 'react';
import {Container, Paper} from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import {withStyles} from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = theme => ({
  buttons: {
    width: 257,
    borderRadius: 12,
    marginLeft: -17,
    marginTop: 15,
    [theme.breakpoints.down('600')]: {
      marginLeft: -9,
    },
  },
  field: {
    margin: 20,
  },
});
class ListBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      isRequired: false,
      inputType: 'string',
    };
  }

  types = [
    {
      value: 'string',
      label: 'text',
    },

    {
      value: 'integer',
      label: 'number',
    },
  ];

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleRequired = () => {
    this.setState({isRequired: !this.state.isRequired});
  };

  handleTypeChange = event => {
    this.setState({inputType: event.target.value});
  };

  handleControlAdd = event => {
    event.preventDefault();
    this.handleClose();
    const arrayName = event.target[0].value;
    const recordName = event.target[2].value;
    const requiredRecords = event.target[4].value;
    const typeofInput = this.state.inputType;
    const ifRequired = this.state.isRequired;
    const codeName = arrayName.replace(/\s/g, '');

    const object = {
      propName: codeName,
      id: 0,
      isRequired: ifRequired,
      data: {
        type: 'array',
        title: arrayName,
        minItems: parseInt(requiredRecords,10),
        items: {
          type: typeofInput,
          title: recordName,
        },
      },
    };
    this.props.Add(object);
  };
  _render = () => {
    const {classes} = this.props;
    return (
      <Container ms={8}>
        <Paper>
          <form onSubmit={this.handleControlAdd}>
            <TextField className={classes.field} label="Field name" defaultValue="" variant="outlined" />
            <TextField
              className={classes.field}
              label="Records names"
              defaultValue=""
              variant="outlined"
            />
            <TextField
              className={classes.field}
              label="Minimal records"
              defaultValue={0}
              variant="outlined"
              type="numbersfafs"
            />
            <TextField
              className={classes.field}
              id="type"
              select
              label="Type"
              value={this.state.inputType}
              onChange={this.handleTypeChange}
              SelectProps={{
                native: true,
              }}>
              {this.types.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
            <FormControlLabel
              className={classes.field}
              control={<Checkbox
                checked={this.state.isRequired}
                onChange={this.handleRequired}
                />
              }
              label="Required?"
              labelPlacement="top"
            />
            <Button className={classes.field} type="submit" variant="contained" color="primary">
              Add
            </Button>
          </form>
        </Paper>
      </Container>
    );
  };
  render() {
    const {classes} = this.props;
    return (
      <Container>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={this.handleOpen}
          className={classes.buttons}>
          Add a List Box
        </Button>
        <Modal
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          open={this.state.open}
          onClose={this.handleClose}>
          {this._render()}
        </Modal>
      </Container>
    );
  }
}
export default withStyles(useStyles)(ListBox);
