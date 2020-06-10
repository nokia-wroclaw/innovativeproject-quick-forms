import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Button from "@material-ui/core/Button";
import {withTheme} from 'react-jsonschema-form';
import {Theme as MuiTheme} from 'rjsf-material-ui';
import {Container} from "@material-ui/core";
const Form = withTheme(MuiTheme);


const useStyles = makeStyles((theme) => ({
    paper: {
        border: '1px solid',
        padding: theme.spacing(1),
        backgroundColor: theme.palette.background.paper,
        maxHeight: "600px",
        overflowY: "scroll"

    },
}));

export default function PendingFormPreview(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'transitions-popper' : undefined;

    return (
        <div>
            <Button aria-describedby={id} type="submit" color="primary"
                    variant="contained" onClick={handleClick}>
                Preview
            </Button>
            <Popper id={id} open={open} anchorEl={anchorEl} transition>
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <div className={classes.paper}>
                            <Form
                            formData={props.formData}
                            disabled={true}
                            schema={props.formSchema}>
                                <Button display="none" />
                            </Form>
                        </div>
                    </Fade>
                )}
            </Popper>
        </div>
    );
}
