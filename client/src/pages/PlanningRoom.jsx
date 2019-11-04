import React, { Component } from 'react';
import VotingPanel from '../components/VotingPanel';
import UsersPanel from '../components/UsersPanel';

export default class PlaningRoom extends Component {
	state = { users: [], socket: null };

	vote = vote => {
		console.log(vote);
		const data = JSON.stringify({vote: vote})
		this.state.socket.send(data)
	};

	componentDidMount = () => {
		const { roomkey, username } = this.props.match.params;
		const socket = new WebSocket(process.env.REACT_APP_URI_WS + roomkey + '/' + username);
		// socket.onopen = function() {
		// 	alert('Соединение установлено.');
		// };

		socket.onclose = function(event) {
			if (event.wasClean) {
				alert('Соединение закрыто чисто');
			} else {
				alert('Обрыв соединения'); // например, "убит" процесс сервера
			}
			alert('Код: ' + event.code + ' причина: ' + event.reason);
		};

		socket.onmessage = (event) => {
			const data = JSON.parse(event.data)
			this.setState({users: data})

		};

		socket.onerror = function(error) {
			console.log(error);
			alert('Ошибка ' + error);
		};
		this.setState({ socket: socket });
	};

	render() {
		return (
			<div>
				<VotingPanel onClick={this.vote} />
				<UsersPanel users = {this.state.users} />
			</div>
		);
	}
}
