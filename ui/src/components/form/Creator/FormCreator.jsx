import React, { Component, useState } from 'react'
import { withTheme } from 'react-jsonschema-form';
import { Theme as MuiTheme } from 'rjsf-material-ui';
import TextBox from './TextBox';
import Grid from '@material-ui/core/Grid';
import ControlList from './ControlsList';

const Form = withTheme(MuiTheme);

export default class FormCreator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listOfControls: [],
            requiredProps: [],
            count: 0,
            title: "ToDo"
        };
        this.removeControl=this.removeControl.bind(this);
    }

    getRequired = () => {
        var requiredNames = [];
        this.state.listOfControls.forEach(function (object) {
            if (object.isRequired) {
                requiredNames.push(object.propName);
            };
        });
        return requiredNames;
    };

    addControl = (object) => {
        object.id = this.state.count;
        this.setState({ count: this.state.count + 1 });
        this.setState({ listOfControls: [...this.state.listOfControls, object] })
    };
    namesOfControls = () => {
        var names = [];
        this.state.listOfControls.forEach(function (object) {
            names.push({ index: object.id, name: object.data.title });
        });
        return names;
    }

    removeControl(object) {
        var array = this.state.listOfControls.filter(function( obj ) {
            return obj.id !== object.index;
        });
        this.setState({ listOfControls: array });
    }

    render() {
        var props = this.state.listOfControls.sort(function (a, b) {
            return a.id - b.id || a.name.localeCompare(b.name);
        });
        var formJson =
        {
            title: this.state.title,
            type: "object",
            required: this.getRequired(this.state.listOfControls),
            properties: props.length !== 0 ? props.reduce((acc, obj) => ({ ...acc, [obj.propName]: obj.data }), {}) : {}
        };
        var listOfNames = this.namesOfControls();
        return (
            <Grid container >
                <Grid item xs={12} sm={5}>
                    <TextBox Add={this.addControl} />
                </Grid>
                <Grid item xs={12} sm={2}>
                    <ControlList controls={listOfNames} remove={this.removeControl} />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Form schema={formJson} />
                </Grid>
            </Grid>
        )
    }
}
