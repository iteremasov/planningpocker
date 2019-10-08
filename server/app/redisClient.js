const redis = require("redis");


class RedisClient {
    constructor(){
        this.client = redis.createClient();
        this.client.on("error", function (err) {
        console.log("Error " + err);
        });
    }

    setRoom(key) {
        try{
            const room = {users: []}
            this.client.set(key, JSON.stringify(room));
            console.log('make room = ', key)

            return {id: key}
        }
        catch{
            console.log('error make room')
            return Error('err')
        }
        
    }
}

module.exports = RedisClient;