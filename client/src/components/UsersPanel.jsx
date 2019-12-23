import React, { Component } from 'react';
import { conformityRevers } from '../static/Static';
import CheckIcon from '@material-ui/icons/Check';

import Icon from '../static/icon.png';

import './userspanel.css';
export default class UsersPanel extends Component {
	render() {
		const users = this.props.users;
		return (
			<div className="usersPanel">
				{users.map((item, index) => {
					return (
						<div className="user" key={index}>
							<div className="userImage">
								<img src={Icon} />
							</div>
							<div className="userName">{item.userName}</div>
							<div className="userVote">
								{item.vote != null ? (
									item.vote === true ? (
										<CheckIcon />
									) : (
										conformityRevers[item.vote]
									)
								) : (
									'--'
								)}
							</div>
						</div>
					);
				})}
			</div>
		);
	}
}
