import React, { useState } from 'react';

import PlaningRoom from '../pages/PlanningRoom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import { withRouter } from "react-router";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: 'center',
  },
}))

function UserName(props) {
  const classes = useStyles();
  const [userName, setUserName] = useState('');
  const [textFieldValue, setTextFieldValue] = useState('')

  const click = () => {
    setUserName(textFieldValue);
  };

  const checkKey = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      click();
    }
  }

  const handleTextFieldChange = e => {
    setTextFieldValue(e.target.value);
  };



  return (
    <>
      {
        userName ?
          (
            <PlaningRoom userName={userName} roomkey={props.match.params.roomkey} />
          ) : (
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  Enter your name. This will help your colleagues identify you.
              </Typography>
                <CardActions className={classes.root}>
                  <form action="" onSubmit={click}>
                    <div className="inputUserName">
                      <TextField
                        autoFocus
                        onKeyDown={checkKey}
                        onChange={handleTextFieldChange}
                        id="outlined-name-input"
                        label="name"
                        className="inputName"
                        margin="dense"
                        variant="outlined"
                      />
                      <Button
                        size="large"
                        disabled={textFieldValue ? false : true}
                        type="submit"
                        className="button"
                      >
                        Join planning
							</Button>
                    </div>
                  </form>
                </CardActions>
              </CardContent>
            </Card>
          )

      }
    </>
  )
}

export default withRouter(UserName);
