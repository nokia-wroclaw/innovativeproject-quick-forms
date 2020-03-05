import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';

function Button() {
    return (
        <Button variant="contained" color="primary">
            Hello World
        </Button>
    );
}

ReactDOM.render(<Button/>, document.querySelector('#button'));
