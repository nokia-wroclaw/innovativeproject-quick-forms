import React from 'react';
import GetForm from './GetForm';
import SingleForm from './SingleForm';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Cookies from 'js-cookie';

const jwtDecode = require('jwt-decode');

const useStyles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
});

class ListOfForms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfForms: [],
      userID: '',
    };
  }

  componentDidMount() {
    const token = Cookies.get('access_token');
    this.setState({userID: jwtDecode(token).user.id});
    this.LoadSchema(jwtDecode(token).user.id);
  }

  LoadSchema = userID => {
    GetForm(userID, `/api/forms/templates/user`).then(response => {
      this.setState({listOfForms: response.data});
    });
  };

  render() {
    const {classes} = this.props;
    return (
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>
            {this.state.listOfForms.map(index => (
              <Grid key={index._id} item>
                <SingleForm
                  className={classes.paper}
                  key={index._id}
                  formID={index._id}
                  title={index.title}
                  description={index.description}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(useStyles)(ListOfForms);
