import React, { Component } from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


import './userName.css';

export default class UserName extends Component {
	state = { textFieldValue: '' };

	click = () => {
		const  roomkey = this.props.match.params.roomkey;
		this.props.history.push('/' + roomkey +'/' + this.state.textFieldValue)
	};
	handleTextFieldChange = e => {
		this.setState({
			textFieldValue: e.target.value,
		});
	};

	render() {
		return (
			<div className="content">
				<div className="inputUserName">
					<TextField
						onChange={this.handleTextFieldChange}
						id="outlined-name-input"
						label="Input your name"
						className="inputName"
						margin="dense"
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
			</div>
		);
	}
}
