import React, { Component } from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default class UserName extends Component {
	state = { textFieldValue: '' };

	click = () => {
		console.log(this.state.textFieldValue);
	};
	handleTextFieldChange = e => {
		this.setState({
			textFieldValue: e.target.value,
		});
	};

	render() {
		return (
			<div className="username">
				<TextField
					onChange={this.handleTextFieldChange}
					id="outlined-name-input"
					label="Input your name"
					className="inputName"
					margin="normal"
					variant="outlined"
				/>
				<Button
					size="large"
					disabled={this.state.textFieldValue ? false : true}
					onClick={this.click}
					className="button"
				>
					Join planning
				</Button>
			</div>
		);
	}
}
