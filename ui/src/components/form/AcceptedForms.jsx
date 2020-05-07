import React from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Box from '@material-ui/core/Box';
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';
import {DeleteFilled} from './FormsHandling';
import Typography from '@material-ui/core/Typography';
import Popup from 'reactjs-popup';
import ShowForm from './ShowForm';

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

  _render(obj) {
    return (
      <Box m={3} key={obj._id}>
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
            path={'filled-forms/single'}
            idOfForm={obj._id}
            template={obj.templateID}
          />
        </Popup>
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
          Approved:
        </Typography>
        {this.props.listOfForms.map(i => this._render(i))}
      </Box>
    );
  }
}

export default AcceptForms;
