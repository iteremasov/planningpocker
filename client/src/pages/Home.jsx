import React, { Component } from 'react';

import Header from '../components/Header';
import Router from '../components/Router';
import Container from '@material-ui/core/Container'

export default class Home extends Component {
	render() {
		return (
			<div className="Home">
				<Header />
				<Container maxWidth="md">
					<Router />
				</Container>
			</div>
		);
	}
}
