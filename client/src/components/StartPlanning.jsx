import React, { Component } from 'react';
import { fetchJsonPost } from '../Services/basicServices';
import './startPlanning.css';
import Button from '@material-ui/core/Button'

export default class StartPlanning extends Component {
	makeRoom = () => {
		fetchJsonPost(process.env.REACT_APP_URI_HTTP + 'rooms', {})
			.then(response => response.json())
			.then(response => this.props.history.push('/' + response.id))
			.catch(err => console.log(err));
	};
	render() {
		return (
			<i className="startPlanning">
				<h1>planning-pocker service</h1>
				<h3>Press the button to start</h3>
				<i className="start-button">
					<Button
						color="primary"
						variant="contained"
						onClick={this.makeRoom}>Start <br /> session
						</Button>
				</i>
			</i>
		);
	}
}
