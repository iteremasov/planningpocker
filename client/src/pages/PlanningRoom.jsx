import React, { Component } from 'react';
import VotingPanel from '../components/VotingPanel';
import UsersPanel from '../components/UsersPanel';
import IssueDescription from '../components/IssueDescription';
import StatisticPanel from '../components/StatisticPanel';
import { Grid } from '@material-ui/core';

import './planning-room.css';

export default class PlaningRoom extends Component {
  state = {
    users: [],
    socket: null,
    description: '',
  };

  cleanVotes = () => {
    const data = JSON.stringify({ key: 'cleanVotes' });
    this.state.socket.send(data);
  };

  setPost = post => {
    const data = JSON.stringify({ key: 'posts', data: post });
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
    const { roomkey, userName } = this.props;
    const socket = new WebSocket(process.env.REACT_APP_URI_WS + roomkey + '/' + userName);
    socket.onopen = function () {
      console.log('Socket is open');
    };

    socket.onclose = function (event) {
      console.warn('Socket closed. Code:', event.code, 'Reason:', event.reason);
    };

    socket.onerror = function (error) {
      console.error('Error connect ws:', error);
    };

    socket.onmessage = event => {
      const data = JSON.parse(event.data);
      switch (data.key) {
        case 'firstConnect':
          this.setState({ users: data.users, description: data.description, posts: data.posts });
          break;
        case 'users':
          this.setState({ users: data.data });
          break;
        case 'description':
          this.setState({ description: data.data });
          break;
        case 'posts':
          this.setState({ posts: data.posts });
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
        <Grid container direction="row" alignItems="flex-start" spacing={3}>
          <Grid xs item>
            <VotingPanel onClick={this.setVote} showVotes={this.showVotes} cleanVotes={this.cleanVotes} />
          </Grid>
          <Grid xs item>
            <IssueDescription
              description={description}
              saveDescription={this.setDescription} />
          </Grid>
        </Grid>

        <Grid container direction="row" alignItems="flex-start" spacing={3}>
          <Grid xs item>
            <UsersPanel users={this.state.users} />
          </Grid>
          <Grid xs item>
            <StatisticPanel users={this.state.users} />
          </Grid>
        </Grid>
      </>


      // <i className="planning-Room">
      //   <section className="first-panel">
      //     <StatisticPanel users={this.state.users} />
      //   </section>
      //   <section>
      //     <VotingPanel onClick={this.setVote} showVotes={this.showVotes} cleanVotes={this.cleanVotes} />
      //   </section>
      //   <section className="description-and-users">
      //     <UsersPanel users={this.state.users} />
      //     <IssueDescription
      //       description={description}
      //       saveDescription={this.setDescription} />
      //   </section>


      // <section className="description-and-users">
      // 	<Grid container spacing={1}>
      // 		<Grid xs={3}>
      // 			<UsersPanel users={this.state.users} />
      // 		</Grid>
      // 		<Grid xs={9}>
      // 			<IssueDescription
      // 				description={description}
      // 				saveDescription={this.setDescription} />
      // 		</Grid>
      // 	</Grid>
      // </section>

    );
  }
}




// <VotingPanel onClick={this.setVote} showVotes={this.showVotes} cleanVotes={this.cleanVotes} />
