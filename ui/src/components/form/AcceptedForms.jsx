import React from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Box from '@material-ui/core/Box';
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';
import {DeleteFilled, GetForm} from './FormsHandling';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import {Container} from '@material-ui/core';
import Popup from 'reactjs-popup';
import {withTheme} from 'react-jsonschema-form';
import {Theme as MuiTheme} from 'rjsf-material-ui';

const Form = withTheme(MuiTheme);

const useStyles = theme => ({
  root: {
    alignItems: 'center',
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
    [theme.breakpoints.down('645')]: {
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

class AcceptForms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filledForm: {},
      formSchema: {},
      isLoading: true,
      open: false,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({open: true});
  }
  closeModal() {
    this.setState({open: false});
  }

  getCurrentFormSchema = templateID => {
    GetForm(templateID, `/api/forms/templates`).then(response =>
      this.setState({formSchema: response.data})
    );
  };

  getCurrentFormData = formID => {
    GetForm(formID, `/api/forms/filled-forms/single`).then(response => {
      this.setState({filledForm: response.data});
    });
  };

  handleDelete = id => {
    DeleteFilled(id)
      .then(() => this.props.reload(this.props.formID))
      .catch(error =>
        console.log(`Nie udalo sie usunac pending formsa${error}`)
      );
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
          bgcolor="primary.main"
          color="primary.contrastText"
          marginTop={5}
          marginBottom={5}>
          <Typography variant="h6" gutterBottom>
            Approved:
          </Typography>
        </Box>
        {this.props.listOfForms.map(i => this._render(i))}
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
      </Box>
    );
  }
}

export default withStyles(useStyles)(AcceptForms);
