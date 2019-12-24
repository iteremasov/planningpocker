import React, { Component } from 'react';
import VotingPanel from '../components/VotingPanel';
import UsersPanel from '../components/UsersPanel';
import IssueDescription from '../components/IssueDescription';
import StaticPanel from '../components/StatisticPanel';
import Chat from '../components/Chat';
import { Grid } from '@material-ui/core';

export default class PlaningRoom extends Component {
	state = { users: [], socket: null, description: '', posts: [] };

	setPost = post => {
		const data = JSON.stringify({key: 'posts', data: post});
		this.state.socket.send(data)
	}

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
		socket.onopen = function() {
			console.log('Socket is open');
		};

		socket.onclose = function(event) {
			console.warn('Socket closed. Code:', event.code, 'Reason:', event.reason);
		};

		socket.onerror = function(error) {
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
					this.setState({posts: data.posts});
					break;
				default:
			}
		};

		this.setState({ socket: socket });
	};

	render() {
		const description = this.state.description;
		return (
			<div className="planning-Room">
				<Grid container spacing={1}>
					<Grid item={true} xs={4}>
						<Chat user={this.props.userName} posts={this.state.posts} setPost={this.setPost}/>
						<UsersPanel users={this.state.users} />
					</Grid>
					<Grid item={true} xs={8}>
						<Grid container>
							<Grid item={true} xs={6}>
								<VotingPanel onClick={this.setVote} showVotes={this.showVotes} />
							</Grid>
							<Grid item={true} xs={6}>
								<StaticPanel users={this.state.users} />
							</Grid>
						</Grid>
						<IssueDescription saveDescription={this.setDescription} description={description} />
					</Grid>
				</Grid>
			</div>
		);
	}
}
