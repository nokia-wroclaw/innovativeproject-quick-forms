import React from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import Box from '@material-ui/core/Box';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {DeletePending, AcceptForm} from './FormsHandling';

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

  _render(obj) {
    return (
      <Box m={3} key={obj._id}>
        {obj._id.substr(obj._id.length - 5)}:&nbsp;
        <Button
          variant="contained"
          color="default"
          startIcon={<CloudUploadIcon />}
        >
          Preview
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => this.handleDelete(obj._id)}
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<SaveIcon />}
          onClick={() => this.handleAccept(obj._id)}
        >
          Save
        </Button>
      </Box>
    );
  }

  render() {
    return (
      <Box>
        <h3>For approval:</h3>
        {this.props.listOfForms.map(i => this._render(i))}
      </Box>
    );
  }
}

export default PendingForms;
