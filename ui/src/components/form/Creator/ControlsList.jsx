import React, { useState, useEffect } from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import LabelImportantTwoToneIcon from '@material-ui/icons/LabelImportantTwoTone';
import Typography from '@material-ui/core/Typography';
import {ReactSortable} from 'react-sortablejs';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 600,
    backgroundColor: theme.palette.background.paper,
    margin: 5,
  },
  nested: {
    paddingLeft: theme.spacing(4),
    marginTop: 2,
    marginDown: 2,
  },
  submit: {
    width: 257,
    borderRadius: 12,
  },
  listItemText: {
    align: 'center',
    wordWrap: 'break-word',
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
  },
}));

function SingleItem(params) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const classes = useStyles();

  const obj = params.obj;
  
  return (
    <div>
      <ListItem key={obj.index} button onClick={handleClick}>
        <ListItemIcon>
          <LabelImportantTwoToneIcon />
        </ListItemIcon>
        <ListItemText className={classes.listItemText} primary={obj.propName} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            className={classes.nested}
            onClick={() => params.remove(obj.id)}>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText className={classes.listItemText} primary="Delete" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText className={classes.listItemText} primary="Edit" />
          </ListItem>
        </List>
      </Collapse>
    </div>
  );
}

export default function ControlList(params) {
  const classes = useStyles();
  const controlsArray = params.controls
  
  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader" disableSticky>
          <Typography
            className={classes.title}
            variant="h4"
            component="h3"
            color="textPrimary">
            Form items
          </Typography>
        </ListSubheader>
      }
      className={classes.root}>
        <ReactSortable
            list={controlsArray}
            setList={newState => params.reorder(newState)}>
          {controlsArray.map(object => (
            <SingleItem key={object.id} obj={object} remove={params.remove} />
          ))}
        </ReactSortable>
    </List>
  );
}
