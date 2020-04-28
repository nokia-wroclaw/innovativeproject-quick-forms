import React from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Box from '@material-ui/core/Box';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {DeleteFilled} from './FormsHandling';

class ListOfFilledForms extends React.Component {
  handleDelete = id => {
    DeleteFilled(id)
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
      </Box>
    );
  }

  render() {
    return (
      <Box>
        <h3>Approved:</h3>
        {this.props.listOfForms.map(i => this._render(i))}
      </Box>
    );
  }
}

export default ListOfFilledForms;
