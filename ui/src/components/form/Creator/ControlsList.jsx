import React from 'react'
import Button from '@material-ui/core/Button';

export default function ControlList(params) {
    const controlsArray = params.controls
    const listItems = controlsArray.map((obj, index) =>
        <li key={obj.index}>{obj.name}      
           <Button variant="contained" color="secondary" onClick={() => params.remove(obj)}>
            Usuń
            </Button>
        </li>
    );
    return (
        <ol>{listItems}</ol>
    );
}