const cors = require('cors');
const RedisClient = require('./redisClient');
const shortid = require('shortid');
var expressWs = require('express-ws');

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
		const room = { users: [] };
		const result = this.redisClient.setRoom(key, room);
		response.send(result);
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
				room.users = [...room.users, { userName: userName, vote: null }];
				this.redisClient.setRoom(roomID, room);

				ws.on('message', async msg => {
					msg = JSON.parse(msg);
					let room = await this.redisClient.getRoom(roomID);
					room = JSON.parse(room);
					const roomConnections = this.connections[roomID];
					room.users = room.users.map(user => {
						if (user.userName == userName) {
							user.vote = msg.vote;
						}
						return user;
					});
					this.redisClient.setRoom(roomID, room);
					roomConnections.map(connection => connection.ws.send(JSON.stringify(room.users)));
				});
				ws.on('close', async () => {
					let room = await this.redisClient.getRoom(roomID);
					room = JSON.parse(room);
					const roomConnections = this.connections[roomID];

					room.users = room.users.filter(user => user.userName != userName);
					this.redisClient.setRoom(roomID, room);

					this.connections[roomID] = this.connections[roomID].filter(user => user.userName != userName);
				});
			}
		}
	}
}

module.exports = Main;
