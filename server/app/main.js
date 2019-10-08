const cors = require('cors');
const RedisClient = require('./redisClient');
const shortid = require('shortid');

class Main {
	constructor(app) {
		if (!app) throw 'app is undefined';
		this.app = app;
		this.redisClient = new RedisClient();
	}

	init(callback) {
		try {
			this.app.use(cors());
			this.app.post('/rooms', this.generateRoom.bind(this));
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
}

module.exports = Main;
