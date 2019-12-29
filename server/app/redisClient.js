const redis = require('redis');

class RedisClient {
	constructor() {
		this.client = redis.createClient();
		this.client.on('error', function(err) {
			console.log('Error ' + err);
		});
	}

	setRoom(key, room) {
		try {
			// const room = { users: [] };
			this.client.set(key, JSON.stringify(room));
			return { id: key };
		} catch {
			console.log('error make room');
			return Error('err');
		}
	}

	getRoom(key) {
		return new Promise((resolve, reject) => {
			this.client.get(key, function(err, res) {
				resolve(res);
				reject(err);
			});
		});
	}
}

module.exports = RedisClient;
