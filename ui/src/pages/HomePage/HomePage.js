import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import GitHubIcon from '@material-ui/icons/GitHub';
import MainCard from './MainCard';
import Content from './Content';
import Sidebar from './Sidebar';
import NavBar from '../NavBar';

const useStyles = makeStyles(theme => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

const mainCard = {
  title: 'What is it?',
  description:
    'Quick forms is an app that let you automate the process of forms filling. You can easily create forms and generate QR codes, so sharing them with people who should complete the forms that you want is effortless',
  image: 'https://source.unsplash.com/random',
  imgText: 'main image description',
};

const sidebar = {
  title: 'About',
  description:
    'The app was developed by a group of three students as a part of an Innovative Projects by Nokia initiative',
  source: [
    {
      name: 'GitHub',
      icon: GitHubIcon,
      link: 'https://github.com/nokia-wroclaw/innovativeproject-quick-forms',
    },
  ],
};

export default function HomePage() {
  const classes = useStyles();

  return (
    <>
      <NavBar title="WELCOME" />
      <CssBaseline />
      <Container maxWidth="lg">
        <main>
          <MainCard card={mainCard} />

          <Grid container spacing={5} className={classes.mainGrid}>
            <Content title="How to use the app?" />
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              source={sidebar.source}
            />
          </Grid>
        </main>
      </Container>
    </>
  );
}
