import React, {Component} from 'react';
export default class TextBox extends Component {
  handleSubmit = event => {
    event.preventDefault();
    const displayName = event.target[0].value;
    const inputType = event.target[1].value;
    const codeName = displayName.replace(/\s/g, '');

    const control = {
      id: 0,
      isRequired: true,
      propName: codeName,
      data: {
        type: inputType,
        title: displayName,
      },
    };
    console.log(control);
    this.props.Add(control);
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Nazwa pola:
          <br />
          <input type="text" />
          <br />
          Typ pola:
          <br />
          <input type="text" />
          <br />
        </label>
        <input type="submit" value="Dodaj" />
      </form>
    );
  }
}
