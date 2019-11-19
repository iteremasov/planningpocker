import React, { useState } from 'react';

import { TextareaAutosize } from '@material-ui/core';

import './issueDescription.css';

const IssueDescription = ({ saveDescription, description }) => {
  const [value, setValue] = useState('');
  const [editing, setEditing] = useState(false);

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
    <div className="issue-description">
      <h1>Issue Description</h1>
      {editing ? <TextareaAutosize autoFocus
				className="issue-description__textarea"
        onChange={changeDescription}
        defaultValue={description}
        aria-label="maximum height"
        rows={5}
      /> : <div onClick={clickButton} className="issue-description__value">
				{description}
			</div>}
      <button onClick={clickButton} className="issue-description__button">
        {editing ? 'SAVE' : 'EDIT'}
      </button>
    </div>
  );
};

export default IssueDescription;
