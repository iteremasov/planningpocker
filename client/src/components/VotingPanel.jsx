import React, { Component } from 'react';
import './votingpanel.css';
import { Grid } from '@material-ui/core';
import { conformity } from '../static/Static';

export default class VotingPanel extends Component {
	resultClick = () => {
		const showVotes = this.props.showVotes;
		showVotes();
	};

	cleanVotes = () => {
		const cleanVotes = this.props.cleanVotes;
		cleanVotes();
	}

	click = item => {
		const act = this.props.onClick;
		act(conformity[item]);
	};
	render() {
		const rowOne = ['0', '1/2', '1', '2'];
		const rowTwo = ['3', '5', '8', '13'];
		const rowThree = ['20', '40', '100', '?'];
		const rowFour = ['♾'];

		const buttonStyle = { width: 48, height: 25 };

		return (
			<i className="votingpanel">
				<Grid container spacing={1}>
					<Grid item xs={6}>
						<i>
							<button onClick={this.resultClick} className="result-button">
								show results
							</button>
						</i>
					</Grid>
					<Grid item xs={6}>
						<i>
							<button onClick={this.cleanVotes} className="clean-button">
								clean
							</button>
						</i>
					</Grid>
				</Grid>
				<Grid container spacing={1}>
					{rowOne.map((item, index) => (
						<Grid item key={index} xs={3}>
							<i>
								<button onClick={() => this.click(item)} className="button" style={buttonStyle}>
									{item}
								</button>
							</i>
						</Grid>
					))}
				</Grid>
				<Grid container spacing={1}>
					{rowTwo.map((item, index) => (
						<Grid item key={index} xs={3}>
							<i>
								<button onClick={() => this.click(item)} className="button" style={buttonStyle}>
									{item}
								</button>
							</i>
						</Grid>
					))}
				</Grid>
				<Grid container spacing={1}>
					{rowThree.map((item, index) => (
						<Grid item key={index} xs={3}>
							<i>
								<button onClick={() => this.click(item)} className="button" style={buttonStyle}>
									{item}
								</button>
							</i>
						</Grid>
					))}
				</Grid>
				<Grid container spacing={1}>
					{rowFour.map((item, index) => (
						<Grid item key={index} xs={3}>
							<i>
								<button onClick={() => this.click(item)} className="button" style={buttonStyle}>
									{item}
								</button>
							</i>
						</Grid>
					))}
				</Grid>
			</i>
		);
	}
}
