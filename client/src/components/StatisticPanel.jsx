import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { conformityRevers } from '../static/Static';

import './staisticPanel.css';

class StatisticPanel extends Component {
	getAllVote = users => {
		const arrayVotes = users.map(user => user.vote);
		return arrayVotes;
	};

	getQuantity = users => {
		return users.length;
	};

	getAverage = users => {
		const votes = this.getAllVote(users);
		const realVotes = [];
		for (let i = 0; i < votes.length; i++) {
			if (votes[i] === 1000 || votes[i] === 10000) {
				continue;
			}
			realVotes.push(votes[i]);
		}
		const summ = realVotes.reduce((summ, item) => item + summ, 0);
		return summ / realVotes.length;
	};

	getVoteMerger = users => {
		const allVote = this.getAllVote(users);
		let result = [];
		let a = [];
		for (let i = 0; i < allVote.length; i++) {
			const vote = allVote[i];
			if (a.includes(vote) || vote === null) {
				continue;
			} else {
				a.push(vote);
				let counter = 0;
				for (let x = 0; x < allVote.length; x++) {
					if (allVote[x] === vote) {
						counter = counter + 1;
					}
				}
				result.push({ vote: vote, counter: counter });
			}
		}

		return result;
	};
	render() {
		const users = this.props.users;
		const statistic = this.getVoteMerger(users);
		return (
			<div className="statistic-panel">
				<h2>Statistic panel</h2>
				<Grid container spacing={1}>
					<Grid xs={6}>Quantity users</Grid>
					<Grid xs={6}>{this.getQuantity(users)}</Grid>
				</Grid>
				<Grid container spacing={1}>
					<Grid xs={6}>Average</Grid>
					<Grid xs={6}>{this.getAverage(users)}</Grid>
				</Grid>
				{statistic.map(item => {
					return (
						<Grid container spacing={1}>
							<Grid xs={6}>vote- {conformityRevers[item.vote]}</Grid>
							<Grid xs={6}>users- {item.counter}</Grid>
						</Grid>
					);
				})}
			</div>
		);
	}
}

export default StatisticPanel;
