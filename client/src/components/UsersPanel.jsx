import React, { Component } from 'react';
import { conformityRevers } from '../static/Static';
import CheckIcon from '@material-ui/icons/Check';
import jdenticon from 'jdenticon';


import './userspanel.css';
export default class UsersPanel extends Component {
	setIcon = userName => {
		const size = 105;
		const png = jdenticon.toSvg(userName, size);
		return { __html: png };
	};
	render() {
		const users = this.props.users;
		return (
			<div className="usersPanel">
				{users.map((item, index) => {
					return (
						<div className="user" key={index}>
							<div className="userImage">
								<div dangerouslySetInnerHTML={this.setIcon(item.userName)} />
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
