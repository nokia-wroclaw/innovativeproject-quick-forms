import React, { Component } from 'react'
import TextBox from './TextBox';
import Grid from '@material-ui/core/Grid';
import ControlList from './ControlsList';
import FormPreview from './FormPreview';

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
        const requiredNames = [];
        this.state.listOfControls.forEach(function (object) {
            if (object.isRequired) {
                requiredNames.push(object.propName);
            };
        });
        return requiredNames;
    };

    addControl = (object) => {
        const duplicate = this.state.listOfControls.find(obj => {
            return obj.propName === object.propName
          })
        if(duplicate !== undefined && duplicate.length !== 0){
            this.setState({
                listOfControls: this.state.listOfControls
                .map(elem => ((elem.propName === object.propName) ? Object.assign({}, {id:elem.id, isRequired: elem.isRequired, propName: elem.propName}, {data: object.data} ) : elem))
              });
              
        }
        else{
            object.id = this.state.count;
            this.setState({ count: this.state.count + 1 });
            this.setState({ listOfControls: [...this.state.listOfControls, object] });
        }
    };
    namesOfControls = () => {
        const names = [];
        this.state.listOfControls.forEach(function (object) {
            names.push({ index: object.id, name: object.data.title });
        });
        return names;
    }

    removeControl(removedObject) {
        const array = this.state.listOfControls.filter(function( obj ) {
            return obj.id !== removedObject.index;
        });
        this.setState({ listOfControls: array });
    }

    render() {
        const props = this.state.listOfControls.sort(function (a, b) {
            return a.id - b.id || a.name.localeCompare(b.name);
        });
        const formJson =
        {
            title: this.state.title,
            type: "object",
            required: this.getRequired(this.state.listOfControls),
            properties: props.length !== 0 ? props.reduce((acc, obj) => ({ ...acc, [obj.propName]: obj.data }), {}) : {}
        };
        const listOfNames = this.namesOfControls();
        return (
            <Grid container >
                <Grid item xs={12} sm={5}>
                    <TextBox Add={this.addControl} />
                </Grid>
                <Grid item xs={12} sm={2}>
                    <ControlList controls={listOfNames} remove={this.removeControl} />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <FormPreview formscheme={formJson}/>
                </Grid>
            </Grid>
        )
    }
}
