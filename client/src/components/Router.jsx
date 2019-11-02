import React, { Component } from 'react';

import { Route, Switch } from 'react-router-dom';

import StartPlanning from './StartPlanning';
import UserName from './UserName';
import PlaningRoom from '../pages/PlanningRoom'

export default class Router extends Component {
	render() {
		return (
			<div className="Router">
				<Switch>
					<Route exact path="/" component={StartPlanning} />
					<Route path="/:roomkey/:username" component={PlaningRoom} />
					<Route path="/:roomkey" component={UserName} />
				</Switch>
			</div>
		);
	}
}