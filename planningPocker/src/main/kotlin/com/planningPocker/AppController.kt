package com.planningPocker

import com.google.gson.Gson
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RestController
import redis.clients.jedis.Jedis

@RestController
class CustomerController {
    val jedis = Jedis()
    val connect = jedis.connect()

    @PostMapping("/rooms")
    @CrossOrigin("*")
    fun hello(): String {
        var randomString = java.util.UUID.randomUUID().toString().substring(0, 7)
        var roomForRedis = RoomForRedis(issueDescription = "", showVotes = false, users = emptyArray())
        jedis.set(randomString, Gson().toJson(roomForRedis))
        return Gson().toJson(RoomId(id = randomString))
    }
}
