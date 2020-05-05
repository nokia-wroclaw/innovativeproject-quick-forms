import React, {Component} from 'react';
import {Button} from "@material-ui/core";

export class LockStep extends Component{

    render(){
        return (
            <div>
                <h1>{this.props.filledFormNumberID}</h1>
                <h1>
                    {' '}
                    Screen is locked, please wait for Template Owner to accept your
                    submit
                </h1>
            </div>
        );
    }
}