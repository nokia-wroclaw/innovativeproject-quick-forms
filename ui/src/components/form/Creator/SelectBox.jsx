import React, {Component} from 'react';
import {Container, Paper} from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import {ReactSortable} from 'react-sortablejs';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import {withStyles} from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = theme => ({
  buttons: {
    width: 257,
    borderRadius: 12,
    marginLeft: -17,
    marginTop: 20,
    [theme.breakpoints.down('600')]: {
      marginLeft: -9,
    },
  },
  field: {
    margin: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  optionsList: {
    marginLeft: 15,
  },
  addButton: {
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 15,
    width: 226,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  listLabel: {
    '&:hover': {
      background: "#f2f2f2",
   },
  },
});

class SelectBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      isRequired: false,
      options: [],
      numberOfOptions: 0,
    };
  }

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
  handleOptionAdd = event => {
    event.preventDefault();

    const newOption = {
      id: this.state.numberOfOptions,
      name: event.target[0].value,
    };
    this.myFormOption.reset();
    this.setState({numberOfOptions: this.state.numberOfOptions + 1});
    this.setState({options: [...this.state.options, newOption]});
  };

  removeOption(removedID) {
    const array = this.state.options.filter(function(obj) {
      return obj.id !== removedID;
    });
    this.setState({options: array});
  }

  handleControlAdd = event => {
    event.preventDefault();
    this.handleClose();
    const selectName = event.target[0].value;
    const codeName = selectName.replace(/\s/g, '');

    const selectOptions = this.state.options.map(function(obj) {
      return obj.name;
    });

    const object = {
      propName: codeName,
      id: 0,
      isRequired: this.state.ifRequired,
      data: {
        type: 'string',
        title: selectName,
        enum: selectOptions,
      },
    };

    this.props.Add(object);
  };
  _render = () => {
    const {classes} = this.props;
    return (
        <Paper>
          <form onSubmit={this.handleControlAdd}>
          <Button className={classes.addButton} variant="contained" color="primary" type="submit">
              Add to preview
            </Button>
            <TextField className={classes.field} label="Field name" defaultValue="" variant="outlined" />
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
          </form>
          <form
            onSubmit={this.handleOptionAdd}
            ref={el => (this.myFormOption = el)}>
            <TextField className={classes.field} label="Option name" defaultValue="" variant="outlined" />
            <Button className={classes.addButton} type="submit" variant="contained">
              Add option
            </Button>
          </form>
          <ReactSortable
            className={classes.optionsList}
            list={this.state.options}
            setList={newState => this.setState({options: newState})}>
            {this.state.options.map(item => (
              <ListItem key={item.id}>
                <div className={classes.listLabel}>
                  {item.name}
                </div>
                <IconButton
                  edge="end"
                  aria-label="comments"
                  onClick={() => this.removeOption(item.id)}>
                  <DeleteForeverOutlinedIcon />
                </IconButton>
              </ListItem>
            ))}
          </ReactSortable>
        </Paper>
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
          Add a Select Box
        </Button>
        <Modal
          className={classes.modal}
          open={this.state.open}
          onClose={this.handleClose}>
          {this._render()}
        </Modal>
      </Container>
    );
  }
}
export default withStyles(useStyles)(SelectBox);
