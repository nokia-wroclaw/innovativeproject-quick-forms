import React from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Box from '@material-ui/core/Box';
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';
import {DeleteFilled} from './FormsHandling';
import Typography from '@material-ui/core/Typography';

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
          Approved:
        </Typography>
        {this.props.listOfForms.map(i => this._render(i))}
      </Box>
    );
  }
}

export default ListOfFilledForms;
