import React, { Component } from 'react'
import TextBox from './TextBox';
import Titles from './Titles';
import Grid from '@material-ui/core/Grid';
import ControlList from './ControlsList';
import FormPreview from './FormPreview';
import NavBar from './../../../pages/NavBar';
import { Container } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Cookies from 'js-cookie';
import { SubmitForm } from '../FormsHandling';

const jwtDecode = require('jwt-decode');

const useStyles = theme => ({
  root: {
    marginTop: 5,
  },
  textbox: {
    maxWidth: 400,
  },
  grid: {
    justifyContent: 'center',
    alignContent: 'center',    
  },
});

class FormCreator extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState();
        this.removeControl=this.removeControl.bind(this);
        this.sumbitFormSchema= this.sumbitFormSchema.bind(this);
    }

    initialState = () => ({
            listOfControls: [],
            requiredProps: [],
            count: 0,
            title: "Form",
            description: "",     
            userID: jwtDecode(Cookies.get('access_token')).user.id
        });

    resetState = () => {
        this.setState(this.initialState());
    };

    getRequired = () => {
        const requiredNames = [];
        this.state.listOfControls.forEach(function (object) {
            if (object.isRequired) {
                requiredNames.push(object.propName);
            };
        });
        return requiredNames;
    };
    
    setTitles = (object) => {
        this.setState({title: object.title});
        this.setState({description: object.description});
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

    sumbitFormSchema = (formSchema) => {
        SubmitForm(formSchema, `/api/forms/templates`)
        .then(() => this.props.history.push('/dashboard'))
        .catch(error => {console.log(`Redirect sie nie udal ${error}`)})
        .catch(error => console.log(`Nie udalo sie dodac schematu fromularza ${error}`));
    };

    render() {
        const props = this.state.listOfControls.sort(function (a, b) {
            return a.id - b.id || a.name.localeCompare(b.name);
        });
        const formJson =
        {
            title: this.state.title,
            userID: this.state.userID,
            description: this.state.description,
            type: "object",
            required: this.getRequired(this.state.listOfControls),
            properties: props.length !== 0 ? props.reduce((acc, obj) => ({ ...acc, [obj.propName]: obj.data }), {}) : {}
        };

        const listOfNames = this.namesOfControls();

        const {classes} = this.props;

        return (
          <div>
            <NavBar title="CREATOR" />
            <Container className={classes.root} maxWidth="xl">
              <Grid container className={classes.grid}>
                  <Grid item sm={6} md={4} lg={3}>
                    <Titles TitleSet={this.setTitles}/>
                    <TextBox className={classes.textbox} Add={this.addControl} />
                  </Grid>
                  <Grid item sm={4} md={4} lg={3}>
                      <ControlList controls={listOfNames} remove={this.removeControl} formSchema={formJson}/>
                  </Grid>
                  <Grid item sm={20} md={15} lg={5}>
                      <FormPreview formSchema={formJson} reset={this.resetState} save={this.sumbitFormSchema} />
                  </Grid>
              </Grid>
            </Container>
          </div>
        )
    }
}

export default withStyles(useStyles)(FormCreator);
