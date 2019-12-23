import React, { Component } from 'react';

import './chat.css';

export default class Chat extends Component {
	state = { post: '', Shift: false };

	changePost = e => {
		this.setState({ post: e.target.value });
	};

	click = () => {
		const { user, setPost } = this.props;
		const data = { user: user, post: this.state.post };
		setPost(data);
		this.setState({ post: '' });
	};

	checkKeyKode = event => {
		if (event.key === 'Shift') {
			this.setState({ Shift: true });
		}
		if (event.key === 'Enter' && !this.state.Shift) {
			event.preventDefault();
			this.click();
		}
	};

	cleanShift = event => {
		if (event.key === 'Shift') {
			this.setState({ Shift: false });
		}
	};
	render() {
		const { posts, user } = this.props;

		return (
			<div className="chat">
				<h3>Chat</h3>
				<div className="display-messeges">
					{posts.map(post => {
						return (
							<div>
								{post.user === user ? (
									<div className="my-post">
										<p className="user-name">{post.user}</p>
										<p className="post-body">{post.post}</p>
									</div>
								) : (
									<div className="not-my-post">
										<p className="user-name">{post.user}</p>
										<p className="post-body">{post.post}</p>
									</div>
								)}
							</div>
						);
					})}
				</div>
				<div>
					<textarea
						onKeyDown={this.checkKeyKode}
						onKeyUp={this.cleanShift}
						value={this.state.post}
						onChange={this.changePost}
						className="input-messege"
					></textarea>
				</div>
				<button onClick={this.click} className="chat-button">
					send
				</button>
			</div>
		);
	}
}
