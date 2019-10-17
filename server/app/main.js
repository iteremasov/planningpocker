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
		const result = this.redisClient.setRoom(key, (room = { users: [] }));
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
			if (room.users.includes(userName)) { //TODO search user
				ws.close();
			} else {
				this._setWS(roomID, ws, userName);
				room.users = [...room.users, { userName: userName, vote: null }];
				this.redisClient.setRoom(roomID, room);

				ws.on('message', async msg => {
					msg = JSON.parse(msg);
					let data = await this.redisClient.getRoom(roomID);
					data = JSON.parse(data);
					const roomConnections = this.connections[roomID];
					data.users = data.users.map(user => {
						if (user.userName == userName) {
							user.vote = msg.vote;
						}
						return user;
					});
					//TODO write to redis 
					roomConnections.map(connection => connection.ws.send(JSON.stringify(data.users)));
				});
				//TODO ws.on('close')
			}
		}
	}
}

module.exports = Main;
