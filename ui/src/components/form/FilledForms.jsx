import React from 'react';
import PendingForms from './PendingForms';
import AcceptedForms from './AcceptedForms';
import {GetForm} from './FormsHandling';
import Container from '@material-ui/core/Container';
import {withStyles} from '@material-ui/core/styles';

const useStyles = theme => ({
  accepted: {
  },
  pending: {
    align: 'center',
  }
});

class FilledForms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      acceptedForms: [],
      pendingForms: [],
      templateid: '',
    };
  }

  componentDidMount() {
    const templateID = this.props.match.params.templateID;
    this.setState({templateid: templateID});
    this.LoadSchema(templateID);
  }

  LoadSchema = templateID => {
    GetForm(templateID, '/api/forms/pendingforms')
      .then(response => this.setState({pendingForms: response.data}))
      .catch(error =>
        console.error(`Błąd pobierania danego pending formsow:${error}`)
      );

    GetForm(templateID, '/api/forms/filled-forms')
      .then(response => this.setState({acceptedForms: response.data}))
      .catch(error =>
        console.error(`Błąd pobierania danego pending formsow:${error}`)
      );
  };

  render() {
    const {classes} = this.props

    return (
      <Container maxWidth='lg'>
        <PendingForms
          className={classes.pending}
          formID={this.state.templateid}
          listOfForms={this.state.pendingForms}
          reload={this.LoadSchema}
        />
        <AcceptedForms
          className={classes.accepted}
          formID={this.state.templateid}
          listOfForms={this.state.acceptedForms}
          reload={this.LoadSchema}
        />
      </Container>
    );
  }
}

export default withStyles(useStyles)(FilledForms);
