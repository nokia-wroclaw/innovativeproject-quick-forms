import React, {useState, useEffect} from 'react';
import { CSVLink, CSVDownload } from "react-csv";
import {makeStyles} from '@material-ui/core/styles';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import {withRouter} from 'react-router-dom';
import {DeleteTemplate, GetForm} from './FormsHandling';
import QrPopup from './QrPopup';
import { Container } from '@material-ui/core';

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
  csv: {
    textDecoration: 'none',
    fontStyle: 'inherit',
    fontDisplay: 'inherit',
    fontWeight: 'inherit',
    color: 'inherit',
    size: "small"
  }
});

function handleDelete(id, userID, reload) {
  DeleteTemplate(id)
    .then(res => reload(userID))
    .catch(error => console.log(`Nie udalo sie usunac formularza${error}`));
}


function SingleForm({formID, title, description, reload, userID}) {
  const [ifQR, showQR] = useState(false);
  const [dataToDownload, setDataToDownload] = useState([]);
  const classes = useStyles();

  const getDataToDownload = () => {
    axios.get(`/api/forms/filled-forms/${formID}`).then(data => {
      //let parsedData = [];
      setDataToDownload(data.data);
      // data.data.forEach(i => parsedData.push(i.dataForm))
    });
  }

    useEffect(() => {
      getDataToDownload(formID);
    }, [])

  return (
    <Container>
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
          <Button color="primary" size="small">
            <CSVLink
                data={dataToDownload}
                className={classes.csv}
                filename={`${title}.csv`}
                target="_blank">
              Download
            </CSVLink>
          </Button>
          <Button
            className={classes.buttons}
            size="small"
            color="primary"
            onClick={() => showQR(!ifQR)}>
            QR code
          </Button>
          <Button
            className={classes.buttons}
            size="small"
            color="primary"
            onClick={() => handleDelete(formID, userID, reload)}>
            Delete
          </Button>

          <Button
            className={classes.buttons}
            size="small"
            color="primary"
            onClick={() => window.location.replace(`/filledforms/${formID}`)}>
            Filled Forms
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
}

export default withRouter(SingleForm);
