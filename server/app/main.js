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
		const result = this.redisClient.setRoom(key);
		response.send(result);
	}

	async wsRoom(ws, req) {
		const { roomID, userName } = req.params;
		let room = await this.redisClient.getRoom(roomID);
		if (room === null) {
			ws.close();
		} else {
			room = JSON.parse(room);
			if (room.users.includes(userName)) {
				ws.close();
			} else {
				ws.on('message', function(msg) {
					console.log(msg);
				});
				console.log(room.users.includes(userName));
			}
		}
	}
}

module.exports = Main;
