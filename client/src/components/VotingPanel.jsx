import React, { Component } from 'react';
import './votingpanel.css';
import { Grid } from '@material-ui/core';

export default class VotingPanel extends Component {
	click = item => {
		const conformity = {
			'0': 0,
			'1/2': 0.5,
			'1': 1,
			'2': 2,
			'3': 3,
			'5': 5,
			'8': 8,
			'13': 13,
			'20': 20,
			'40': 40,
			'100': 100,
			'?': 1000,
			'♾': Infinity,
		};
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
			<div className="votingpanel">
				<Grid container spacing={1}>
					{rowOne.map((item, index) => (
						<Grid item key={index} xs={3}>
							<div>
								<button onClick={() => this.click(item)} className="button" style={buttonStyle}>
									{item}
								</button>
							</div>
						</Grid>
					))}
				</Grid>
				<Grid container spacing={1}>
					{rowTwo.map((item, index) => (
						<Grid item key={index} xs={3}>
							<div>
								<button onClick={() => this.click(item)} className="button" style={buttonStyle}>
									{item}
								</button>
							</div>
						</Grid>
					))}
				</Grid>
				<Grid container spacing={1}>
					{rowThree.map((item, index) => (
						<Grid item key={index} xs={3}>
							<div>
								<button onClick={() => this.click(item)} className="button" style={buttonStyle}>
									{item}
								</button>
							</div>
						</Grid>
					))}
				</Grid>
				<Grid container spacing={1}>
					{rowFour.map((item, index) => (
						<Grid item key={index} xs={3}>
							<div>
								<button onClick={() => this.click(item)} className="button" style={buttonStyle}>
								{item}
								</button>
							</div>
						</Grid>
					))}
				</Grid>
			</div>
		);
	}
}
