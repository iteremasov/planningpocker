import React, { Component } from 'react';
import { fetchJsonPost } from '../Services/basicServices';
import './startPlanning.css';

export default class StartPlanning extends Component {
	makeRoom = () => {
		fetchJsonPost(process.env.REACT_APP_URI_HTTP + 'rooms', {})
			.then(response => response.json())
			.then(response => this.props.history.push('/' + response.id))
			.catch(err => console.log(err));
	};
	render() {
		return (
			<div className="startPlanning">
				<h1>planning-pocker service</h1>
				<h3>Press the button to start</h3>
				<div className="start-button">
					<button onClick={this.makeRoom}>Start <br/> session </button>
				</div>
			</div>
		);
	}
}
