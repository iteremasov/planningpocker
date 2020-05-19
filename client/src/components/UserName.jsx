import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: 'center',
  },
}));

export function UserName({ setUser }) {
  const classes = useStyles();
  const [textFieldValue, setTextFieldValue] = useState('');

  const handleSetUser = () => {
    setUser(textFieldValue);
  };

  const checkKey = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSetUser();
    }
  };

  const handleTextFieldChange = e => {
    setTextFieldValue(e.target.value);
  };

  return (
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2">
            Enter your name. This will help your colleagues identify you.
          </Typography>
          <CardActions className={ classes.root }>
            <form action="" onSubmit={ handleSetUser }>
              <div className="inputUserName">
                <TextField
                  autoFocus
                  onKeyDown={ checkKey }
                  onChange={ handleTextFieldChange }
                  id="outlined-name-input"
                  label="name"
                  className="inputName"
                  margin="dense"
                  variant="outlined"
                />
                <Button
                  size="large"
                  disabled={ !textFieldValue }
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
