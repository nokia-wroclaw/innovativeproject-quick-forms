import React from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import Box from '@material-ui/core/Box';
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';
import Typography from '@material-ui/core/Typography';
import ClearIcon from '@material-ui/icons/Clear';
import {DeletePending, AcceptForm, RejectPending} from './FormsHandling';

class PendingForms extends React.Component {
  handleAccept = id => {
    AcceptForm(id)
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

  handleReject = pendingFormNumberID => {
    RejectPending(pendingFormNumberID);
  };

  handlePreview = pendingFormNumberID => {
    window.location.replace(`/previewdata/${pendingFormNumberID}`);
  };

  _render(obj) {
    return (
      <Box m={3} key={obj._id}>
        {obj.filledFormNumberID}:&nbsp;
        <Button
          variant="contained"
          color="default"
          startIcon={<ChromeReaderModeIcon />}
        >
          Preview
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<CheckIcon />}
          onClick={() => this.handleAccept(obj._id)}
        >
          Accept
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<ClearIcon />}
          onClick={() => this.handleReject(obj.filledFormNumberID)}
          content={'More'}
        >
          Reject
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => this.handleDelete(obj._id)}
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      </Box>
    );
  }

  render() {
    return (
      <Box>
        <Typography variant="h6" gutterBottom>
          For Approval:
        </Typography>
        {this.props.listOfForms.map(i => this._render(i))}
      </Box>
    );
  }
}

export default PendingForms;
