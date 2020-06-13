import React from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import Box from '@material-ui/core/Box';
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';
import Typography from '@material-ui/core/Typography';
import ClearIcon from '@material-ui/icons/Clear';
import {
  DeletePending,
  AcceptForm,
  RejectPending,
  GetForm,
} from './FormsHandling';
import {withStyles} from '@material-ui/core/styles';
import Popup from 'reactjs-popup';
import {Container} from '@material-ui/core';
import {withTheme} from 'react-jsonschema-form';
import {Theme as MuiTheme} from 'rjsf-material-ui';
import RejectFormDialog from "./RejectFormDialog";
import AcceptRejectSnackbar from './AcceptRejectSnackbar';

const Form = withTheme(MuiTheme);

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
    },
  },
  someButtons: {
    display: 'block',
  },
  popup: {
    maxHeight: 500,
    overflow: 'auto',
  },
});

class PendingForms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filledForm: {},
      formSchema: {},
      isLoading: true,
      open: false, //change to preview open
      rejectFormDialogOpen:false,
      currentFormID:''
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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

  handleReject = (pendingFormNumberID, message) => {
    RejectPending(pendingFormNumberID, message).then(res =>
      this.props.reload(this.props.formID)
    );
  };

  openModal() {
    this.setState({open: true});
  }
  closeModal() {
    this.setState({open: false});
  }

  openRejectFormDialog = () => {
    this.setState({rejectFormDialogOpen:true});
  }

  setCurrentFormID = (filledFormNumberID) => {
    this.setState({currentFormID : filledFormNumberID})
  }

  closeRejectFormDialog = () => {
    this.setState({rejectFormDialogOpen:false});
  }

  getCurrentFormSchema = templateID => {
    GetForm(templateID, `/api/forms/templates`).then(response =>
      this.setState({formSchema: response.data})
    );
  };

  getCurrentFormData = formID => {
    GetForm(formID, `/api/forms/pendingForms/single`).then(response => {
      this.setState({filledForm: response.data});
    });
  };

  _render(obj) {
    const {classes} = this.props;
    return (
      <Box
        m={3}
        key={obj._id}
        display="flex"
        justifyContent="center"
        alignItems="center">
        {obj.filledFormNumberID
          .toString()
          .slice(-4)
          .toUpperCase()}
        :&nbsp;
        <div className={classes.someButtons}>
          <Button
            className={classes.button}
            variant="contained"
            color="default"
            startIcon={<ChromeReaderModeIcon />}
            onClick={() => {
              this.getCurrentFormSchema(obj.templateID);
              this.getCurrentFormData(obj._id);
              this.openModal();
            }}>
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
          <Button // onClick gets obj.filledFormNu RejectFormDialog
            className={classes.button}
            variant="contained"
            color="primary"
            startIcon={<ClearIcon />}
            onClick={() => {
              this.setCurrentFormID(obj.filledFormNumberID)
              this.openRejectFormDialog()
            }}
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

  _renderWithRejectAcceptBlocked(obj) {
    const {classes} = this.props;
    return (
        <Box
            m={3}
            key={obj._id}
            display="flex"
            justifyContent="center"
            alignItems="center">
          {obj.filledFormNumberID.toString().slice(-4).toUpperCase()}:&nbsp;
          <div className={classes.someButtons}>
            <Button
                className={classes.button}
                variant="contained"
                color="default"
                startIcon={<ChromeReaderModeIcon />}
                onClick={() => {
                  this.getCurrentFormSchema(obj.templateID);
                  this.getCurrentFormData(obj._id);
                  this.openModal();
                }}>
              Preview
            </Button>
            <AcceptRejectSnackbar />
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
        <Box
          p={2}
          bgcolor="secondary.main"
          color="primary.contrastText"
          marginBottom={5}>
          <Typography variant="h6" gutterBottom>
            For Approval:
          </Typography>
        </Box>
        {this.props.listOfForms.filter(i => i.state === 2).map(i => this._render(i))}
        {this.props.listOfForms.filter(i => i.state === 1).map(i => this._renderWithRejectAcceptBlocked(i))}

        <Popup
          open={this.state.open}
          closeOnDocumentClick
          onClose={this.closeModal}>
          <Container className={classes.popup}>
            <Form
              formData={this.state.filledForm.dataForm}
              disabled={true}
              schema={this.state.formSchema}>
              <Button display="none" />
            </Form>
          </Container>
        </Popup>


        <RejectFormDialog
                          rejectFormDialogOpen={this.state.rejectFormDialogOpen}
                          openRejectFormDialog={this.openRejectFormDialog}
                          closeRejectFormDialog={this.closeRejectFormDialog}
                          RejectPending={this.handleReject}
                          pendingFormNumberID={this.state.currentFormID}
        />

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
