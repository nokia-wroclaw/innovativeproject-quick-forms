import React, {Component, IntrinsicElements as styled} from 'react'
import {Button, Container} from "@material-ui/core";
import {withTheme} from "react-jsonschema-form";
import Paper from '@material-ui/core/Paper';
import {Theme as MuiTheme} from "rjsf-material-ui";
import {makeStyles} from '@material-ui/core/styles';
import CardMedia from "@material-ui/core/CardMedia";
import TextField from "@material-ui/core/TextField";

const Form = withTheme(MuiTheme);

const useStyles = makeStyles(() => ({
    Container:{
        alignItems:'center',
        marginLeft:'41%',
    },
        imageCard:{
            image: `url(${require('../../../images/greenAcceptedTick.png')})`,
        },
    media: {
            position:'relative',
        height: '33%',
        width: '33%',
        margin: 'auto',
        paddingTop:'33%',

    },
    text: {
        color:'green',
        textAlign:'center',
    },
    }));



export function EndStep(props){

    const classes = useStyles();


   const next = (event) => {
        event.preventDefault();
        window.location.replace('/')
    }

        return(
            <React.Fragment>
                <h1 className={classes.text}>Your application was accepted</h1>
            <CardMedia className={classes.media}
                       image={require('../../../images/greenAcceptedTick.png')}
                       title="Accepted"/>
                <Container>
                    <div className={classes.Container}>
                        <Button style={{justifyContent: 'center'}} variant="contained" color="primary" type="submit" onClick = {next}>
                            Navigate to homepage
                        </Button>
                    </div>
                </Container>
            </React.Fragment>
        )
}

export default EndStep;