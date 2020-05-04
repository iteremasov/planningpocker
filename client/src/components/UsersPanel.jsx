import React from 'react';
import { conformityRevers } from '../static/Static';
import CheckIcon from '@material-ui/icons/Check';
import jdenticon from 'jdenticon';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
// import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton'
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import ProgressBar from './ProgressBar';


export default function UsersPanel({ users }) {

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          Users
        </Typography>
        <ProgressBar users={users} />
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
                            <HelpOutlineOutlinedIcon />
                          )
                      }
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              )
            })
          }
        </List>
      </CardContent>
    </Card>
  );
}

