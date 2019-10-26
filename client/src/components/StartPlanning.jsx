import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { fetchJsonPost } from '../Services/basicServices';
import './startPlanning.css'

export default class StartPlanning extends Component {
	makeRoom = () => {
		fetchJsonPost(process.env.REACT_APP_URI_HTTP + 'rooms', {})
			.then(response => response.json())
			.then(response => console.log(response))
			.catch(err => console.log(err))
	};
	render() {
		return (
			<div className="startPlanning">
				<Button onClick={this.makeRoom}>Start Planning</Button>
			</div>
		);
	}
}
