import React from 'react';
import SubmitForm from '../SubmitForm/SubmitForm';

class AddForm extends React.Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
  }

  handleSubmit = () => {
    SubmitForm(this.fileInput.current.files[0], 'api/forms/templates');
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Prześlij plik:
          <input type="file" ref={this.fileInput} />
        </label>
        <br />
        <button type="submit">Wyślij</button>
      </form>
    );
  }
}
export default AddForm;
