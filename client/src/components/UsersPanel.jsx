import React from 'react';
import { conformityRevers } from '../static/Static';
import jdenticon from 'jdenticon';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton'
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import ProgressBar from './ProgressBar';

const findUser = (users, name) => {
  const userObj = users.find(user => user.userName === name);
  return userObj;
}

const getAnotherUserArr = (users, selfName) => {
  return users.filter(user => user.userName !== selfName)
}

export default function UsersPanel({ users, selfName }) {
  const currentUser = findUser(users, selfName);
  const anotherUsersArray = getAnotherUserArr(users, selfName);

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          Users
        </Typography>
        <ProgressBar users={users} />
        <List dense>
          <ListItem >
            <ListItemAvatar>
              <Avatar alt="image">
                <i dangerouslySetInnerHTML={{ __html: jdenticon.toSvg(currentUser?.userName, 105) }} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primaryTypographyProps={{ variant: 'subtitle2' }} primary={currentUser?.userName + ' (you)'} />
            <ListItemSecondaryAction>
              <IconButton>
                {
                  currentUser?.voteCounter > 0 ? (
                    conformityRevers[currentUser?.vote]
                  ) : (
                      <HelpOutlineOutlinedIcon />
                    )
                }
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          {
            anotherUsersArray.map((user, index) => {
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
                        user.voteCounter > 0 ? (
                          user.vote === null ? (
                            <i dangerouslySetInnerHTML={{ __html: jdenticon.toSvg(user.voteCounter, 30) }} />
                          ) : (
                              conformityRevers[user.vote]
                            )
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

