import React, { Component } from 'react';
import VotingPanel from '../components/VotingPanel';
import UsersPanel from '../components/UsersPanel';
import IssueDiscription from '../components/IssueDiscription';

export default class PlaningRoom extends Component {
	state = { users: [], socket: null, discription: '' };

	setVote = vote => {
		const data = JSON.stringify({ key: 'vote', data: vote });
		this.state.socket.send(data);
	};

	setDiscription = discription => {
		const data = JSON.stringify({ key: 'discription', data: discription });
		this.state.socket.send(data);
	};

	componentDidMount = () => {
		const { roomkey, username } = this.props.match.params;
		const socket = new WebSocket(process.env.REACT_APP_URI_WS + roomkey + '/' + username);
		// socket.onopen = function() {
		// };

		// socket.onclose = function(event) {
		// };

		socket.onerror = function(error) {
			console.log('error connect ws');
		};

		socket.onmessage = event => {
			const data = JSON.parse(event.data);
			switch (data.key) {
				case 'firstConnect':
					this.setState({ users: data.users, discription: data.discription });
					break;
				case 'users':
					this.setState({ users: data.data });
					break;
				case 'discription':
					this.setState({ discription: data.data });
					break;
			}
		};

		this.setState({ socket: socket });
	};

	render() {
		const discription = this.state.discription;
		return (
			<div>
				<IssueDiscription saveDiscription={this.setDiscription} discription={discription} />

				<VotingPanel onClick={this.setVote} />
				<UsersPanel users={this.state.users} />
			</div>
		);
	}
}
