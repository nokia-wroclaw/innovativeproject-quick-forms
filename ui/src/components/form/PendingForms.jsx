import React from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import Box from '@material-ui/core/Box';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {DeletePending, AcceptForm, GetForm} from './FormsHandling';

class ListOfPendingForms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pendingForms: [],
    };
  }

  componentDidMount() {
    const {templateID} = this.props.formID;
    this.LoadSchema(templateID);
  }

  LoadSchema = templateID =>
    GetForm(templateID, '/api/forms/pendingforms')
      .then(response => this.setState({pendingForms: response.data}))
      .catch(error =>
        console.error(`Błąd pobierania danego pending formsa:${error}`)
      );

   handleAccept = (id) => {
      AcceptForm(id)
    };

  handleDelete = id => {
    DeletePending(id);
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

        {this.state.pendingForms.map(i => this._render(i))}
      </Box>
    );
  }
}

export default ListOfPendingForms;
