import React, { Component } from 'react';
import Container from '@material-ui/core/Container'

import { Header } from '../components/Header';
import { Router } from '../boot/Router';

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
