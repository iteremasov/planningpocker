import React, { Component } from 'react';

import Icon from '../static/icon.png';

import './userspanel.css'
export default class UsersPanel extends Component {
	render() {
        const users = this.props.users;
        const userPanelWidth = {width: users.length * 101}
		return (
			<div className="usersPanel" style={userPanelWidth}>
				{console.log(typeof users)}
				{users.map(item => {
					return (
						<div className="user" >
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
