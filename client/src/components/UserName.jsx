import React, { Component } from 'react';

import PlaningRoom from '../pages/PlanningRoom';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import './userName.css';

export default class UserName extends Component {
	state = { textFieldValue: '', userName: '' };

	click = () => {
		this.setState({ userName: this.state.textFieldValue });
	};

	checkKey = event => {
		if(event.key === 'Enter'){
			event.preventDefault();
			this.click();
		}
	}
	handleTextFieldChange = e => {
		this.setState({
			textFieldValue: e.target.value,
		});
	};

	render() {
		return (
			<div>
				{this.state.userName ? (
					<PlaningRoom userName={this.state.userName} roomkey={this.props.match.params.roomkey} />
				) : (
					<div className="content">
						<div className="inputUserName">
							<TextField
								autoFocus
								onKeyDown={this.checkKey}
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
				)}
			</div>
		);
	}
}
