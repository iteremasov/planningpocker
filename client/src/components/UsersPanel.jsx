import React, { Component } from 'react';

import Icon from '../static/icon.png';

import './userspanel.css'
export default class UsersPanel extends Component {
	render() {
        const users = this.props.users;
		return (
			<div className="usersPanel">
				{users.map((item, index) => {
					return (
						<div className="user" key={index} >
							<div className="userImage">
								<img src={Icon} />
							</div>
							<div className="userName">{item.userName}</div>
							<div className="userVote">{item.vote ? item.vote : '--' }</div>
						</div>
					);
				})}
			</div>
		);
	}
}
