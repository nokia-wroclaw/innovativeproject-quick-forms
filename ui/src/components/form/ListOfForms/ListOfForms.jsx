import React from 'react';
import GetForm from '../GetForm/GetForm';
import SingleForm from '../SingleForm/SingleForm';
import {withStyles} from '@material-ui/core/styles';

const useStyles = () => ({
  paper: {
    display: 'flex',
    flexDirection: 'column' | 'row',
    alignItems: 'center',
  },
});

class ListOfForms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfForms: [],
    };
  }

  componentDidMount() {
    this.LoadSchema();
  }

  LoadSchema = () => {
    GetForm('', '/api/forms/templates/').then(response =>
      this.setState({listOfForms: response.data})
    );
  };

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.paper}>
        {this.state.listOfForms.map(index => (
          <SingleForm
            key={index._id}
            formID={index._id}
            template={index.template}
          />
        ))}
      </div>
    );
  }
}

export default withStyles(useStyles)(ListOfForms);
