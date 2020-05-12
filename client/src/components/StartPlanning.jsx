import React, { Component } from 'react';
import { fetchJsonPost } from '../Services/basicServices';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import './startPlanning.css';
import Button from '@material-ui/core/Button'

export default class StartPlanning extends Component {
  makeRoom = () => {
    fetchJsonPost(process.env.REACT_APP_URI_HTTP + 'rooms', {})
      .then(response => response.json())
      .then(response => this.props.history.push('/' + response.id))
      .catch(err => console.log(err));
  };
  render() {
    const styles = {
      root: {
        justifyContent: 'center'
      }
    };
    return (
      <Card>
        <CardContent>
          <Typography variant="h3" component="h2">
            planning-pocker service
          </Typography>
          <Typography variant="h5" component="h2">
            Press the button to start
          </Typography>
          <CardActions classes={{root: styles.root}}>
            <Button
              color="primary"
              variant="contained"
              onClick={this.makeRoom}>Create <br /> Room
             </Button>
          </CardActions>
        </CardContent>
      </Card>
    );
  }
}
