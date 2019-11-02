import React, { Component } from 'react';
import VotingPanel from '../components/VotingPanel';

export default class PlaningRoom extends Component {
	state = { vote: null };

	vote = vote => {
		console.log(vote)
		this.setState({ vote: vote });
	};

	componentDidMount = () => {
		const { roomkey, username } = this.props.match.params;
		const socket = new WebSocket(process.env.REACT_APP_URI_WS + roomkey + '/' + username);
		socket.onopen = function() {
			alert('Соединение установлено.');
		};

		socket.onclose = function(event) {
			if (event.wasClean) {
				alert('Соединение закрыто чисто');
			} else {
				alert('Обрыв соединения'); // например, "убит" процесс сервера
			}
			alert('Код: ' + event.code + ' причина: ' + event.reason);
		};

		socket.onmessage = function(event) {
			alert('Получены данные ' + event.data);
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
				room
				<VotingPanel onClick={this.vote} />
			</div>
		);
	}
}
