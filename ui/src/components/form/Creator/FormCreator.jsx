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
import ListBox from './ListBox';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';

const jwtDecode = require('jwt-decode');

const drawerWidth = 290;

const useStyles = theme => ({
  root: {
    marginTop: 15,
  },
  textbox: {
    maxWidth: drawerWidth,
  },
  grid: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    [theme.breakpoints.down('1302')]: {//17903
      display: 'block',
      justifyContent: 'right',
      alignContent: 'right',
      marginLeft: drawerWidth + 150,
    },
    [theme.breakpoints.down('1170')]: {//17903
      marginLeft: drawerWidth + 75,
    },
    [theme.breakpoints.down('800')]: {//17903
      marginLeft: drawerWidth,
    },
  },
  formItems: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center,'
  },
  formPreview: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    [theme.breakpoints.down('1302')]: {
      marginLeft: 0,
    },
  },
  settingsTitle: {
    marginLeft: 70,
  },
  previewTitle: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    marginBottom: 10,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    position: 'absolute',
    paddingLeft: 15,
    background: '#f5fdff',
    marginTop: 105,
    width: drawerWidth,
    [theme.breakpoints.down('600')]: {
      marginTop: 56,
    },
  },
  drawerContainer: {
    overflow: 'auto',
  },
  divider: {
    height: window.screen.availHeight * 0.6,//1359
    [theme.breakpoints.down('1302')]: {
      display: 'none',
    },
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
              <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                  paper: classes.drawerPaper,
                }}  
              >
                <Typography className={classes.settingsTitle} variant="h4" component="h3" color="textPrimary">
                  Settings
                </Typography>
                <Titles TitleSet={this.setTitles}/>
                <TextBox className={classes.textbox} Add={this.addControl} />
                <ListBox Add={this.addControl}/>
                <Divider />
              </Drawer>
              <Grid container className={classes.grid} alignContent="center">
                <Grid item sm={1} md={1}></Grid>
                <Grid className={classes.formItems} item sm={4} md={6} lg={4}>
                  <ControlList controls={listOfNames} remove={this.removeControl} formSchema={formJson}/>
                </Grid>
                <Grid item>
                  <Divider className={classes.divider} orientation="vertical" />
                </Grid>
                <Grid className={classes.formPreview} item sm={4} md={6} lg={4}>
                  <Typography className={classes.previewTitle} variant="h4" component="h3" color="textPrimary">
                    Preview
                  </Typography>
                  <FormPreview formSchema={formJson} reset={this.resetState} save={this.sumbitFormSchema} />
                </Grid>
              </Grid>
            </Container>
          </div>
        )
    }
}

export default withStyles(useStyles)(FormCreator);