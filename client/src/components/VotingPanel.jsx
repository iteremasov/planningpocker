import React from 'react';
import { conformity } from '../static/Static';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  voteButton: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));

const getRandom = (max) => {
  return Math.floor(Math.random() * max);
}

export default function VotingPanel({ disableButton, showVotes, cleanVotes, onClick }) {

  const click = item => {
    onClick(conformity[item]);
  };
  const classes = useStyles();
  const values = ['0', '1/2', '1', '2', '3', '5', '8', '13', '20', '40', '100', '?', '♾'];

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          Votes
        </Typography>
        <CardActions>
          <Button color="primary" variant="contained" onClick={showVotes}>Show Results</Button>
          <Button color="primary" variant="contained" onClick={cleanVotes}>Clean</Button>
          <Button disabled={disableButton} color="primary" variant="contained" onClick={() => { click(values[getRandom(values.length)]) }}>Random</Button>
        </CardActions>
        <CardActions>
          <div>
            {
              values.map(value => {
                return (
                  <Button disabled={disableButton} key={value} className={classes.voteButton} color="secondary" variant="contained" onClick={() => click(value)}>{value}</Button>
                )
              })
            }
          </div>
        </CardActions>
      </CardContent>
    </Card>
  )
}
