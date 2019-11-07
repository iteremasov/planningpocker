import React, { Component } from 'react';

import { TextareaAutosize } from '@material-ui/core';

import './issueDiscription.css';

export default class IssueDiscription extends Component {
	state = { discription: '' };

	changeDiscription = e => {
		this.setState({discription: e});
	};

	clickButton = () => {
		const saveDiscription = this.props.saveDiscription;
		saveDiscription(this.state.discription);
	};

	render() {
		const discription = this.props.discription;
		return (
			<div className="issuediscription">
				<h1>Issue Discription</h1>
				<TextareaAutosize
					onChange={event => {
						this.changeDiscription(event.target.value);
					}}
					defaultValue={discription}
					id="texteria"
					aria-label="maximum height"
					rows={5}
				/>
				<button onClick={this.clickButton} className="savebutton">
					SAVE
				</button>
			</div>
		);
	}
}
