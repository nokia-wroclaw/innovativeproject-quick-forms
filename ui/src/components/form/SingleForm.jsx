import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import {withRouter} from 'react-router-dom';
import {DeleteTemplate} from './FormsHandling';
import QrPopup from './QrPopup';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: '10px 10px',
  },
  actions: {
    background: '#efffff',
  },
  buttons: {
    //color: '#0f0f0f',
  },
});

function handleDelete(id, userID, reload) {
  DeleteTemplate(id)
    .then(res => reload(userID))
    .catch(error => console.log(`Nie udalo sie usunac formularza${error}`));
}

function SingleForm({formID, title, description, reload, userID}) {
  const [ifQR, showQR] = useState(false);
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <QrPopup
          formID={formID}
          title={title}
          description={description}
          ifQR={ifQR}
          showQR={showQR}
        />
      </CardActionArea>
      <CardActions className={classes.actions}>
        <Button
          className={classes.buttons}
          size="small"
          color="primary"
          onClick={() => window.location.replace(`/userform/${formID}`)}
        >
          Fill
        </Button>
        <Button
          className={classes.buttons}
          size="small"
          color="primary"
          onClick={() => showQR(!ifQR)}
        >
          QR code
        </Button>
        <Button
          className={classes.buttons}
          size="small"
          color="primary"
          onClick={() => handleDelete(formID, userID, reload)}
        >
          Delete
        </Button>

        <Button
          className={classes.buttons}
          size="small"
          color="primary"
          onClick={() => window.location.replace(`/filledforms/${formID}`)}
        >
          Filled Forms
        </Button>
      </CardActions>
    </Card>
  );
}

export default withRouter(SingleForm);
