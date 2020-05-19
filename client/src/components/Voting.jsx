import React, { Component } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { Grid } from '@material-ui/core';

import { VotingPanel } from './VotingPanel';
import { UsersPanel } from './UsersPanel';
import { IssueDescription } from './IssueDescription';
import { StatisticPanel } from './StatisticPanel';
import { DisconnectModal } from './DisconnectModal';

export class Voting extends Component {
  state = {
    users: [],
    socket: null,
    description: '',
    showVotes: null,
    disconnectSocket: false
  };

  cleanVotes = () => {
    const data = JSON.stringify({ key: 'cleanVotes' });
    this.state.socket.send(data);
  };

  setVote = vote => {
    const data = JSON.stringify({ key: 'vote', data: vote });
    this.state.socket.send(data);
  };

  showVotes = () => {
    const data = JSON.stringify({ key: 'showVotes', data: true });
    this.state.socket.send(data);
  };

  setDescription = description => {
    const data = JSON.stringify({ key: 'description', data: description });
    this.state.socket.send(data);
  };

  componentDidMount = () => {
    const { roomkey, username } = this.props;
    const url = process.env.REACT_APP_URI_WS + roomkey + '/' + username;
    const socket = new ReconnectingWebSocket(url, null, { debug: false, reconnectInterval: 3000 });
    socket.onopen = () => {
      console.log('onopen');
      this.setState({ disconnectSocket: false });
    };

    socket.onclose = (event) => {
      console.log('onclose');
      this.setState({ disconnectSocket: true });
      console.warn('Socket closed. Code:', event.code, 'Reason:', event.reason);
    };

    socket.onerror = (error) => {
      console.log('onerror');
      this.setState({ disconnectSocket: true });
      console.error('Error connect ws:', error);
    };

    socket.onmessage = event => {
      const data = JSON.parse(event.data);
      switch (data.key) {
        case 'firstConnect':
          this.setState({ users: data.users, description: data.description, showVotes: data.showVotes });
          break;
        case 'users':
          this.setState({ users: data.data, showVotes: data.showVotes });
          break;
        case 'description':
          this.setState({ description: data.data });
          break;
        default:
      }
    };

    this.setState({ socket: socket });
  };

  changeStateComponent = componentName => {
    let components = this.state.components;
    components = components.map(item => {
      if (item.name === componentName) {
        item.active = !item.active;
      }
      return item;
    });
    this.setState({ components: components });
  };

  render() {
    const description = this.state.description;
    return (
      <>
        <DisconnectModal showModal={ this.state.disconnectSocket }/>
        <Grid container direction="row" alignItems="flex-start" spacing={ 3 }>
          <Grid xs item>
            <VotingPanel disableButton={ this.state.showVotes } onClick={ this.setVote } showVotes={ this.showVotes }
                         cleanVotes={ this.cleanVotes }/>
          </Grid>
          <Grid xs item>
            <IssueDescription
              description={ description }
              saveDescription={ this.setDescription }/>
          </Grid>
        </Grid>

        <Grid container direction="row" alignItems="flex-start" spacing={ 3 }>
          <Grid xs item>
            <UsersPanel users={ this.state.users } selfName={ this.props.username }/>
          </Grid>
          <Grid xs item>
            <StatisticPanel users={ this.state.users } showVotes={ this.state.showVotes }/>
          </Grid>
        </Grid>
      </>
    );
  }
}
