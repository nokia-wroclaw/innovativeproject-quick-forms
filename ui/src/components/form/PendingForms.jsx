import React from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import Box from '@material-ui/core/Box';
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';
import Typography from '@material-ui/core/Typography';
import ClearIcon from '@material-ui/icons/Clear';
import {DeletePending, AcceptForm, RejectPending} from './FormsHandling';

import ShowForm from './ShowForm';
import {withStyles} from '@material-ui/core/styles';

const useStyles = theme => ({
  root: {
    align: 'center',
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
    [theme.breakpoints.down('1065')]: {
      width: 100,
      justifyContent: 'center',
      alignItems: 'center',
    }
  },
  someButtons: {
    display: 'block',
  },
});

class PendingForms extends React.Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
  }

  handleAccept = (pendingFormNumberID, id) => {
    AcceptForm(pendingFormNumberID, id)
      .then(res => this.props.reload(this.props.formID))
      .catch(error => console.log(`Nie udalo sie zakceptowac${error}`));
  };

  handleDelete = id => {
    DeletePending(id)
      .then(res => this.props.reload(this.props.formID))
      .catch(error =>
        console.log(`Nie udalo sie usunac pending formsa${error}`)
      );
  };

  handleReject = (pendingFormNumberID, id) => {
    RejectPending(pendingFormNumberID, id).then(res =>
      this.props.reload(this.props.formID)
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
          path={'pendingforms/single'}
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
          color="primary"
          startIcon={<CheckIcon />}
          onClick={() => this.handleAccept(obj.filledFormNumberID, obj._id)}>
          Accept
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          startIcon={<ClearIcon />}
          onClick={() => this.handleReject(obj.filledFormNumberID, obj._id)}
          content={'More'}>
          Reject
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
        <Box p={2} bgcolor="secondary.main" color="primary.contrastText" marginBottom={5}>
          <Typography variant="h6" gutterBottom>
            For Approval:
          </Typography>
        </Box>
        {this.props.listOfForms.map(i => this._render(i))}

        <Button
          variant="contained"
          color="secondary"
          onClick={() => this.props.reload(this.props.formID)}
          startIcon={<CheckIcon />}>
          Load Forms
        </Button>
      </Box>
    );
  }
}

export default withStyles(useStyles)(PendingForms);
