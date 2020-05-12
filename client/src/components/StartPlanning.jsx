import React from 'react';
import { fetchJsonPost } from '../Services/basicServices';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button'
import { withRouter } from "react-router";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: 'center',
  },
}))

const makeRoom = (props) => {
  fetchJsonPost(process.env.REACT_APP_URI_HTTP + 'rooms', {})
    .then(response => response.json())
    .then(response => props.history.push('/' + response.id))
    .catch(err => console.log(err));
};


function StartPlanning(props) {
  const classes = useStyles();
  return (
    <Card>
      <CardContent>
        <Typography variant="h3" component="h2">
          planning-pocker service
          </Typography>
        <Typography variant="h5" component="h2">
          Press the button to start
          </Typography>
        <CardActions className={classes.root} >
          <Button
            color="primary"
            variant="contained"
            onClick={() => { makeRoom(props) }}>Create <br /> Room
             </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}

export default withRouter(StartPlanning)
