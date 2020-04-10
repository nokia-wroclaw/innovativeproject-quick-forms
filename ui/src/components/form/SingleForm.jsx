import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {withRouter} from 'react-router-dom';
import QRCode from 'react-qr-code';
import DeleteForm from './DeleteForm';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: '10px 10px',
  },
});

function SingleForm({formID, title, description, history}) {
  const [ifQR, showQR] = useState(false);
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
          <Typography>
            {ifQR ? <QRCode value={`/userform/${formID}`} /> : null}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => history.push(`/userform/${formID}`)}
        >
          Edit
        </Button>
        <Button size="small" color="primary" onClick={() => showQR(!ifQR)}>
          Generate QR code
        </Button>
        <Button size="small" color="primary" onClick={() => {DeleteForm(formID);
                                                            window.location.reload()}}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

export default withRouter(SingleForm);

// export const SingleForm = ({formID, template}) => (
//   <div>
//     <pre>
//       <h1>{JSON.stringify(template, null, 2)}</h1>{' '}
//     </pre>
//   </div>
// );
