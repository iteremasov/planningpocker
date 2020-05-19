import React, { useState } from 'react';

import { Voting } from '../components/Voting.jsx';
import { UserName } from '../components/UserName.jsx';

export const PanningRoom = ({ match }) => {
  const [username, setUsername] = useState('');

  if (username.length > 0) {
    return <Voting username={username} roomkey={match.params.roomkey} />
  }

  return <UserName setUser={setUsername} />
};
