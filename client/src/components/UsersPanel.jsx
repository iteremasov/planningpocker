import React from 'react';
import { conformityRevers } from '../static/Static';
import CheckIcon from '@material-ui/icons/Check';
import jdenticon from 'jdenticon';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton'
import ClearIcon from '@material-ui/icons/Clear';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));


export default function UsersPanel({ users }) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([1]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List dense>
      {
        users.map((user, index) => {
          return (
            <ListItem key={user.userName}>
              <ListItemAvatar>
                <Avatar alt="image">
                  <i dangerouslySetInnerHTML={{ __html: jdenticon.toSvg(user.userName, 105) }} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={user.userName} />
              <ListItemSecondaryAction>
                <IconButton>
                  {
                    user.vote != null ? (
                      user.vote === true ?
                        <CheckIcon /> :
                        conformityRevers[user.vote]
                    ) : (
                        <ClearIcon />
                      )
                  }
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          )
        })
      }
    </List>
  );
}

