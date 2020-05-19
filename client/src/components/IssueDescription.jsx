import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { TextareaAutosize } from '@material-ui/core';

import './IssueDescription.css';

const useStyles = makeStyles((theme) => ({
  typography: {
    whiteSpace: "pre-line",
    textAlign: "left",
    cursor: "pointer"
  }
}));

export const IssueDescription = ({ saveDescription, description }) => {
  const [value, setValue] = useState('');
  const [editing, setEditing] = useState(false);

  const classes = useStyles();

  const changeDescription = (event) => {
    setValue(event.target.value);
  };

  const clickButton = () => {
    if (editing) {
      saveDescription(value);
      setEditing(false);
    } else {
      setEditing(true);
    }
  };
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          Issue Description
        </Typography>
        <div>
          {
            editing ?
              <TextareaAutosize
                autoFocus
                className="issue-description__textarea"
                onChange={ changeDescription }
                defaultValue={ description }
                aria-label="maximum height"
                rows={ 5 }
              />
              :
              <Typography className={ classes.typography } onClick={ clickButton } component="p">
                { description }
              </Typography>
          }
          <Button onClick={ clickButton }>
            { editing ? 'SAVE' : 'EDIT' }
          </Button>
        </div>
      </CardContent>
    </Card>
  )
};
