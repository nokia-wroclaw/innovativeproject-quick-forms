import React from 'react';
import Popup from 'reactjs-popup';
//import QRCode from 'react-qr-code';
import QRCode from 'qrcode.react';
import ButtonBase from '@material-ui/core/ButtonBase';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FilledInput from '@material-ui/core/FilledInput';

export const ContentOfCard = ({formID, title, description, ifQR, showQR}) => {
  return (
    <CardContent>
      <Typography gutterBottom variant="h5" component="h2">
        {title}
      </Typography>
      <Typography variant="body2" color="textSecondary" component="p">
        {description}
      </Typography>
      <Typography align="center">
        {ifQR ? (
          <QRCode
            value={`${window.location.href.substr(
              0,
              window.location.href.length - 10
            )}/userform/${formID}`}
            size={220}
          />
        ) : null}
      </Typography>
    </CardContent>
  );
};

const useStyles = theme => ({
  button: {
    width: '100%',
    height: '100%',
  },
  qrbuttons: {
    display: 'flex',
  },
  popupContent: {
    display: 'block',
  },
  field: {
    marginTop: 8,
    marginBottom: 8,
  },
});

class QrPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.baseURL = `${window.location.href.substr(
      0,
      window.location.href.length - 10
    )}/userform/${this.props.formID}`;
    this.qr = React.createRef();
    this.downloadQR = this.downloadQR.bind(this);
  }
  openModal() {
    this.setState({open: true});
  }
  closeModal() {
    this.setState({open: false});
  }

  downloadQR() {
    console.log(this.qr.current);
    const canvas = document.getElementById(this.baseURL);
    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    let downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = `${this.props.formID}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  render() {
    const {classes} = this.props;
    return (
      <div>
        <ButtonBase className={classes.button} onClick={this.openModal}>
          <ContentOfCard
            formID={this.props.formID}
            title={this.props.title}
            description={this.props.description}
            ifQR={this.props.ifQR}
            showQR={this.props.showQR}
          />
        </ButtonBase>
        <Popup
          open={this.state.open}
          closeOnDocumentClick
          onClose={this.closeModal}
          contentStyle={{
            width: 255,
          }}>
          <div className={classes.popupContent}>
            <QRCode
              id={this.baseURL}
              ref={this.qr}
              value={this.baseURL}
              size={250}
            />
            <FilledInput
              className={classes.field}
              fullWidth
              readOnly
              value={this.baseURL}
            />
            <div className={classes.qrbuttons}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={this.downloadQR}>
                Save
              </Button>
            </div>
          </div>
        </Popup>
      </div>
    );
  }
}

export default withStyles(useStyles)(QrPopup);
