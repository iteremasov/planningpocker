import React, { Component } from 'react';

import Header from '../components/Header';
import Router from '../components/Router';

export default class Home extends Component {
	render() {
		return (
			<div className="Home">
				<Header />
				<Router />
			</div>
		);
	}
}
