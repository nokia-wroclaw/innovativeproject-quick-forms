import React from 'react';
import axios from 'axios';

class SingleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: [],
    };
  }

  componentDidMount() {
    axios
      .get('') ///// Wpisac tu url skad bedziemy pobierac pojedynczego formsa
      .then(response => {
        this.setState({form: response.data});
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  }

  render() {
    return (
      <div className="singleForm.component">
        <pre>{JSON.stringify(this.state.form, null, 2)}</pre>
      </div>
    );
  }
}

export default SingleForm;
