import React from 'react';
import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { conformityRevers } from '../constants/estimates';

const getAllVote = users => {
  return users.map(user => user.vote);
};

const getQuantity = users => {
  return users.length;
};

const getAverage = users => {
  const votes = getAllVote(users);
  const realVotes = [];
  for (let i = 0; i < votes.length; i++) {
    if (votes[i] === 1000 || votes[i] === 10000) {
      continue;
    }
    realVotes.push(votes[i]);
  }
  const summ = realVotes.reduce((summ, item) => item + summ, 0);
  const result = summ / realVotes.length;
  if (result) {
    return result;
  } else {
    return 0;
  }
};

const getVoteMerger = users => {
  const allVote = getAllVote(users);
  let result = [];
  let a = [];
  for (let i = 0; i < allVote.length; i++) {
    const vote = allVote[i];
    if (a.includes(vote) || vote === null) {
      continue;
    } else {
      a.push(vote);
      let counter = 0;
      for (let x = 0; x < allVote.length; x++) {
        if (allVote[x] === vote) {
          counter = counter + 1;
        }
      }
      result.push({ vote: vote, counter: counter });
    }
  }
  return result;
};

export function StatisticPanel({ users, showVotes }) {
  const statistic = getVoteMerger(users);
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          Statistic
        </Typography>
        <List>
          <ListItem>
            <ListItemText>
              Quantity users
            </ListItemText>
            <ListItemSecondaryAction>
              {getQuantity(users)}
            </ListItemSecondaryAction>
          </ListItem>
          {
            showVotes &&
            <div>
              <ListItem>
                <ListItemText>
                  Average
            </ListItemText>
                <ListItemSecondaryAction>
                  {getAverage(users)}
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem >
                <ListItemText>
                  Votes
                </ListItemText>
                <ListItemSecondaryAction>
                  Points
                </ListItemSecondaryAction>
              </ListItem>
              {statistic.map((item, index) => {
                return (
                  <ListItem key={index}>
                    <ListItemText>
                      {item.counter}
                    </ListItemText>
                    <ListItemSecondaryAction>
                      {conformityRevers[item.vote]}
                    </ListItemSecondaryAction>
                  </ListItem>
                )
              })}
            </div>
          }
        </List>
      </CardContent>
    </Card>
  )
}
