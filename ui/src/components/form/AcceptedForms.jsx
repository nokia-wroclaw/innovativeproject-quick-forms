import React from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Box from '@material-ui/core/Box';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {DeleteFilled, GetForm} from './FormsHandling';

class ListOfFilledForms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filledForms: [],
    };
  }

  componentDidMount() {
    const {templateID} = this.props.formID;
    this.LoadSchema(templateID);
  }

  LoadSchema = templateID =>
    GetForm(templateID, '/api/forms/filled-forms')
      .then(response => this.setState({filledForms: response.data}))
      .catch(error =>
        console.error(`Błąd pobierania danego template:${error}`)
      );
      
  handleDelete = id => {
    DeleteFilled(id);
    window.location.reload();
  };
  
  _render(obj) {
    return (
      <Box m={3} key={obj._id}>
        {obj._id}:&nbsp;
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

        {this.state.filledForms.map(i => this._render(i))}
      </Box>
    );
  }
}

export default ListOfFilledForms;
