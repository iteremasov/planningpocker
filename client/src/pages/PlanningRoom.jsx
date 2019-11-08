import React, { Component } from 'react';
import VotingPanel from '../components/VotingPanel';
import UsersPanel from '../components/UsersPanel';
import IssueDescription from '../components/IssueDescription';

export default class PlaningRoom extends Component {
	state = { users: [], socket: null, description: '' };

	setVote = vote => {
		const data = JSON.stringify({ key: 'vote', data: vote });
		this.state.socket.send(data);
	};

	setDescription = (description) => {
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
					this.setState({ users: data.users, description: data.description });
					break;
				case 'users':
					this.setState({ users: data.data });
					break;
				case 'description':
					this.setState({ description: data.data });
					break;
				default:
					console.warn('Unknown data key in socket:', data.key);
			}
		};

		this.setState({ socket: socket });
	};

	render() {
		const description = this.state.description;
		return (
			<div>
				<IssueDescription saveDescription={this.setDescription} description={description} />
				<VotingPanel onClick={this.setVote} />
				<UsersPanel users={this.state.users} />
			</div>
		);
	}
}
