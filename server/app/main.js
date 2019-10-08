const cors = require('cors');
const RedisClient = require('./redisClient');
const shortid = require('shortid');


var self;

class Main {
	constructor(app) {
		if (!app) throw 'app is undefined';
        this.app = app;
        this.redisClient = new RedisClient();
		self = this;
	}

	init(callback) {
		try {
			this.app.use(cors());
			this.app.post('/rooms', this.generateRoom);
			callback();
		} catch (e) {
			callback(e);
		}
	}
	generateRoom(request, response) {
        const key = shortid.generate();
        const result = self.redisClient.setRoom(key)
		response.send(result);
	}
}

module.exports = Main;
