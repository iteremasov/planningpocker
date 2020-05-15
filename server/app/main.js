const cors = require('cors');
const RedisClient = require('./redisClient');
const shortid = require('shortid');
const expressWs = require('express-ws');

class Main {
	constructor(app) {
		if (!app) throw 'app is undefined';
		expressWs(app);
		this.app = app;
		this.redisClient = new RedisClient();
		this.connections = {};
	}

	init(callback) {
		try {
			this.app.use(cors());
			this.app.post('/rooms', this.generateRoom.bind(this));
			this.app.ws('/planning/room/:roomID/:userName', this.wsRoom.bind(this));
			callback();
		} catch (e) {
			callback(e);
		}
	}
	generateRoom(request, response) {
		const key = shortid.generate();
		const room = { users: [], issueDescription: '', showVotes: false, posts: [] };
		const result = this.redisClient.setRoom(key, room);
		response.send(JSON.stringify(result));
	}

	_setWS(roomID, ws, userName) {
		const roomConnections = this.connections[roomID];
		if (!roomConnections) {
			this.connections[roomID] = [{ userName: userName, ws: ws }];
		} else {
			const newConn = [...roomConnections, { userName: userName, ws: ws }];
			this.connections[roomID] = newConn;
		}
	}

	_allVoteCheck(users) {
		if (users.find(user => user.vote === null)) {
			return false;
		}
		return true;
	}

	_sendDataInFront(metod, roomID, room, roomConnections) {
		switch (metod) {
			case 'firstConnect':
				if (room.showVotes) {
					roomConnections.map(connection => {
						connection.ws.send(
							JSON.stringify({
								key: 'firstConnect',
								users: room.users,
								description: room.issueDescription,
								showVotes: room.showVotes
							})
						);
					});
				} else {
					roomConnections.map(connection => {
						const users = room.users.map(user => {
							if (user.userName !== connection.userName) {
								return { ...user, vote: null };
							} else {
								return { ...user };
							}
						});
						connection.ws.send(
							JSON.stringify({
								key: 'firstConnect',
								users: users,
								description: room.issueDescription,
								showVotes: room.showVotes
							})
						);
					});
				}
				break;
			case 'users':
				if (room.showVotes) {
					roomConnections.map(connection => {
						connection.ws.send(JSON.stringify({ key: 'users', data: room.users, showVotes: room.showVotes }));
					});
				} else {
					roomConnections.map(connection => {
						const users = room.users.map(user => {
							if (user.userName !== connection.userName) {
								return { ...user, vote: null };
							} else {
								return { ...user };
							}
						});
						connection.ws.send(JSON.stringify({ key: 'users', data: users, showVotes: room.showVotes }));
					});
				}
				break;
			case 'description':
				const data = { key: 'description', data: room.issueDescription };
				roomConnections.map(connection => connection.ws.send(JSON.stringify(data)));
				break;
		}
	}

	async wsRoom(ws, req) {
		const { roomID, userName } = req.params;
		let room = await this.redisClient.getRoom(roomID);
		if (room === null) {
			ws.close();
		} else {
			room = JSON.parse(room);
			if (room.users.find(user => user.userName === userName)) {
				ws.close();
			} else {
				this._setWS(roomID, ws, userName);
				room.users = [...room.users, { userName: userName, vote: null, voteCounter: 0 }];
				this.redisClient.setRoom(roomID, room);
				this._sendDataInFront('firstConnect', roomID, room, this.connections[roomID]);

				ws.on('message', async msg => {
					msg = JSON.parse(msg);
					let room = await this.redisClient.getRoom(roomID);
					room = JSON.parse(room);
					const roomConnections = this.connections[roomID];
					switch (msg.key) {
						case 'cleanVotes':
							room.users = room.users.map(user => {
								user.vote = null;
								user.voteCounter = 0;
								return user;
							});
							room.showVotes = false;
							this.redisClient.setRoom(roomID, room);
							this._sendDataInFront('users', roomID, room, roomConnections);
							break;
						case 'vote':
							room.users = room.users.map(user => {
								if (user.userName === userName) {
									user.vote = msg.data;
									user.voteCounter++;
								}
								return user;
							});
							if (this._allVoteCheck(room.users)) {
								room.showVotes = true;
							}
							this.redisClient.setRoom(roomID, room);
							this._sendDataInFront('users', roomID, room, roomConnections);
							break;
						case 'description':
							room.issueDescription = msg.data;
							this.redisClient.setRoom(roomID, room);
							this._sendDataInFront('description', roomID, room, roomConnections);
							break;
						case 'showVotes':
							room.showVotes = msg.data;
							this.redisClient.setRoom(roomID, room);
							this._sendDataInFront('users', roomID, room, roomConnections);
							break;
					}
				});
				ws.on('close', async () => {
					let room = await this.redisClient.getRoom(roomID);
					room = JSON.parse(room);
					room.users = room.users.filter(user => user.userName !== userName);
					this.redisClient.setRoom(roomID, room);
					this.connections[roomID] = this.connections[roomID].filter(user => user.userName !== userName);
					this._sendDataInFront('users', roomID, room, this.connections[roomID]);
					if (this.connections[roomID].length === 0) {
						delete this.connections[roomID];
						// this.redisClient.delRoom(roomID);
					}
				});
			}
		}
	}
}

module.exports = Main;
