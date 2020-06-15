import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
  text: {
    margin: 10,
    fontSize: 20,
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontWeight: 500,
  },
}));

export default function Content(props) {
  const {title} = props;
  const classes = useStyles();

  return (
    <Grid item xs={12} md={8}>
      <Typography component="h1" variant="h3" gutterBottom>
        {title}
      </Typography>
      <Divider />
      <Typography className={classes.text}>
        Usage is really simple. You just need to create an account. And then you
        will be redirected to your dashboard, where you can create new forms and
        share them with others!. Form filling process has never been that easy!
      </Typography>
    </Grid>
  );
}

Content.propTypes = {
  posts: PropTypes.array,
  title: PropTypes.string,
};
