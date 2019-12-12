import React, { Component } from 'react';

import './chat.css';

export default class Chat extends Component {
	state = { post: '' };

	changePost = e => {
		this.setState({ post: e.target.value });
	};

	click = () => {
		const { user, setPost } = this.props;
		const data = { user: user, post: this.state.post };
		setPost(data);
		this.setState({ post: '' });
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
					<textarea value={this.state.post} onChange={this.changePost} className="input-messege"></textarea>
				</div>
				<button onClick={this.click} className="chat-button">
					send
				</button>
			</div>
		);
	}
}
