import React, { Component } from 'react'
export default class TextBox extends Component {

    
    handleSubmit = (event) => {
        event.preventDefault();
        var name = event.target[0].value;
        var InputType = event.target[1].value
        var DisplayName = event.target[2].value

        var control = {
            id:0,
            isRequired: true,
            propName: name, 
            data: {
                type: InputType,
                title: DisplayName
            }
        };

        this.props.Add(control)
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Nazwa pola:
                    <br/>
                    <input type="text" />
                    <br/>
                    Typ pola:
                    <br/>
                    <input type="text" />
                    <br/>
                    Wyswietlana nazwa:
                    <br/>
                    <input type="text" />
                    <br/>
                </label>
                <input type="submit" value="Dodaj" />
            </form>
        )
    }
}
