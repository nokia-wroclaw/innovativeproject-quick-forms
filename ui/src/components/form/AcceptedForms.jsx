import React from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Box from '@material-ui/core/Box';
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';
import {DeleteFilled} from './FormsHandling';
import Typography from '@material-ui/core/Typography';
import ShowForm from './ShowForm';
import {withStyles} from '@material-ui/core/styles';

const useStyles = theme => ({
  root: {
    alignItems: 'center',
  },
  button: {
    display: 'inline',
    marginTop: 5,
    marginBottom: 5,
    marginRight: 5,
    marginLeft: 5,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('645')]: {
      width: 100,
      justifyContent: 'center',
      alignItems: 'center',
    }
  },
  someButtons: {
    display: 'block',
  },
});

class AcceptForms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({open: true});
  }
  closeModal() {
    this.setState({open: false});
  }

  handleDelete = id => {
    DeleteFilled(id)
      .then(() => this.props.reload(this.props.formID))
      .catch(error =>
        console.log(`Nie udalo sie usunac pending formsa${error}`)
      );
  };

  handlePreview = () => {
    this.refs.child.openModal();
  };

  _render(obj) {
    const {classes} = this.props;
    return (
      <Box m={3} key={obj._id} display="flex" justifyContent="center" alignItems="center">
        {obj.filledFormNumberID}:&nbsp;
        <div className={classes.someButtons}>
        <ShowForm
          path={'filled-forms/single'}
          idOfForm={obj._id}
          template={obj.templateID}
          ref="child"
        />
        <Button
          className={classes.button}
          variant="contained"
          color="default"
          startIcon={<ChromeReaderModeIcon />}
          onClick={() => this.handlePreview()}>
          Preview
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          color="secondary"
          onClick={() => this.handleDelete(obj._id)}
          startIcon={<DeleteIcon />}>
          Delete
        </Button>
        </div>
      </Box>
    );
  }

  render() {
    const {classes} = this.props;

    return (
      <Box className={classes.root}>
        <Box p={2} bgcolor="primary.main" color="primary.contrastText" marginTop={5} marginBottom={5}>
          <Typography variant="h6" gutterBottom>
            Approved:
          </Typography>
        </Box>
        {this.props.listOfForms.map(i => this._render(i))}
      </Box>
    );
  }
}

export default withStyles(useStyles)(AcceptForms);
