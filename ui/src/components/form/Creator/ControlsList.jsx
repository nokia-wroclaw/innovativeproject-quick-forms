import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
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
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';


const useStyles = makeStyles((theme) => ({
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
  }
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
        <ListItemText primary={obj.name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested} onClick={() => params.remove(obj)}>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary="Delete" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText primary="Edit" />
          </ListItem>
        </List>
      </Collapse>
    </div>
  );
}

export default function ControlList(params) {
  const classes = useStyles();
  
  const controlsArray = params.controls

  const items = controlsArray.map((obj, index) =>
    <SingleItem obj={obj} remove={params.remove} />
  );

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          <Button className={classes.submit} type="submit" variant="contained" color="secondary" startIcon={<DeleteIcon />} onClick={() => params.reset()}>
            Reset form
          </Button>
          <Button className={classes.submit} type="submit" variant="contained" color="primary" startIcon={<SaveIcon />} onClick={() => params.save(params.formSchema)}>
            Save form
          </Button>
          <Typography variant="h4" component="h3">
            Form items
          </Typography>
        </ListSubheader>
      }
      className={classes.root}
    >
      {items}
    </List>
  );
}