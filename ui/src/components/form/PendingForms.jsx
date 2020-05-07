import React from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import Box from '@material-ui/core/Box';
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';
import Typography from '@material-ui/core/Typography';
import ClearIcon from '@material-ui/icons/Clear';
import {DeletePending, AcceptForm, RejectPending} from './FormsHandling';
import Popup from 'reactjs-popup';
import ShowForm from './ShowForm';

class PendingForms extends React.Component {
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
    RejectPending(pendingFormNumberID, id);
  };

  handlePreview = pendingFormNumberID => {
    window.location.replace(`/previewdata/${pendingFormNumberID}`);
  };

  _render(obj) {
    return (
      <Box m={3} key={obj._id} >
        {obj.filledFormNumberID}:&nbsp;
        <Button
          variant="contained"
          color="default"
          startIcon={<ChromeReaderModeIcon />}
          onClick={this.openModal}>
          Preview
        </Button>
        <Popup
          open={this.state.open}
          closeOnDocumentClick
          onClose={this.closeModal}>
          <ShowForm
            path={'pendingforms/single'}
            idOfForm={obj._id}
            template={obj.templateID}
          />
        </Popup>
        <Button
          variant="contained"
          color="primary"
          startIcon={<CheckIcon />}
          onClick={() => this.handleAccept(obj.filledFormNumberID, obj._id)}
        >
          Accept
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<ClearIcon />}
          onClick={() => this.handleReject(obj.filledFormNumberID)}
          content={'More'}>

          Reject
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => this.handleDelete(obj._id)}
          startIcon={<DeleteIcon />}>
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
