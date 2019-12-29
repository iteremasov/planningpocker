import React, { Component } from 'react';
import VotingPanel from '../components/VotingPanel';
import UsersPanel from '../components/UsersPanel';
import IssueDescription from '../components/IssueDescription';
import StaticPanel from '../components/StatisticPanel';
import Chat from '../components/Chat';
import { Grid } from '@material-ui/core';

import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import './planning-room.css';

export default class PlaningRoom extends Component {
	state = {
		users: [],
		socket: null,
		description: '',
		posts: [],
		components: [
			{ name: 'Voteing', component: VotingPanel, active: false },
			{ name: 'Issue-Description', component: IssueDescription, active: true },

			{ name: 'Chat', component: Chat, active: false },
			{ name: 'users', component: UsersPanel, active: false },
			{ name: 'Statistic', component: StaticPanel, active: false },
		],
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
		const components = this.state.components;
		const description = this.state.description;
		return (
			<div className="planning-Room">
				<div className="selected-active-components">
					{components.map((item, index) => {
						return (
							<button
								className="select-active-components-button"
								onClick={() => {
									this.changeStateComponent(item.name);
								}}
								key={index}
							>
								{item.name}
								{item.active ? <ExpandMoreIcon /> : <ExpandLessIcon />}
							</button>
						);
					})}
				</div>
				<div>
					{components[0].active && (
						<VotingPanel onClick={this.setVote} showVotes={this.showVotes} cleanVotes={this.cleanVotes} />
					)}
					{components[4].active && <StaticPanel users={this.state.users} />}
					{components[1].active && components[2].active ? (
						<Grid container spacing={1}>
							<Grid xs={4} item>
								<Chat user={this.props.userName} posts={this.state.posts} setPost={this.setPost} />
							</Grid>
							<Grid xs={8} item>
								<IssueDescription saveDescription={this.setDescription} description={description} />
							</Grid>
						</Grid>
					) : (
						<div>
							{components[1].active && (
								<IssueDescription saveDescription={this.setDescription} description={description} />
							)}
							{components[2].active && (
								<Chat user={this.props.userName} posts={this.state.posts} setPost={this.setPost} />
							)}
						</div>
					)}
					{components[3].active && <UsersPanel users={this.state.users} />}
				</div>
			</div>
		);
	}
}
