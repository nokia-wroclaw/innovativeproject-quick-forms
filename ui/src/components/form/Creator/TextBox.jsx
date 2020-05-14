import React, { Component } from 'react'
export default class TextBox extends Component {

    
    handleSubmit = (event) => {
        event.preventDefault();
        var name = event.target[0].value;
        var InputType = event.target[1].value
        var friendlyName = name.replace(/\s+/g, '');
        friendlyName = friendlyName.substring(0, Math.min(friendlyName.length, 10));
        
        var control = {
            id:0,
            isRequired: true,
            propName: friendlyName, 
            data: {
                type: InputType,
                title: name
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
                </label>
                <input type="submit" value="Dodaj" />
            </form>
        )
    }
}
