import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {makeStyles} from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'inline',
  },
  button: {
    display: 'inline',
    marginTop: 5,
    marginBottom: 5,
    marginRight: 5,
    marginLeft: 5,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('1065')]: {
      width: 100,
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
}));

export default function AcceptRejectSnackbar() {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Button
        className={classes.button}
        onClick={handleClick}
        variant="contained"
        color="primary"
        startIcon={<CheckIcon />}>
          Accept
      </Button>
      <Button
        className={classes.button}
        onClick={handleClick}
        variant="contained"
        color="primary"
        startIcon={<ClearIcon />}
        content={'More'}>
          Reject
      </Button>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        message="User is editing"
        action={
          <React.Fragment>
            {/* <Button color="secondary" size="small" onClick={handleClose}>
              UNDO
            </Button> */}
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}