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
			<i className="chat">
				<h3>Chat</h3>
				<i className="display-messeges">
					{posts.map((post, index) => {
						return (
							<i key={index}>
								{post.user === user ? (
									<i className="my-post">
										<p className="user-name">{post.user}</p>
										<p className="post-body">{post.post}</p>
									</i>
								) : (
									<i className="not-my-post">
										<p className="user-name">{post.user}</p>
										<p className="post-body">{post.post}</p>
									</i>
								)}
							</i>
						);
					})}
				</i>
				<i>
					<textarea
						onKeyDown={this.checkKeyKode}
						onKeyUp={this.cleanShift}
						value={this.state.post}
						onChange={this.changePost}
						className="input-messege"
					></textarea>
				</i>
				<button onClick={this.click} className="chat-button">
					send
				</button>
			</i>
		);
	}
}
