package com.planningPocker

import org.springframework.web.socket.WebSocketSession

data class User(val userName: String, var vote: Float?, var voteCounter: Int)

data class Message(val key: String, var users: Any, var description: String)

data class UsersMessage(var key: String = "users", var data: List<User>)

data class DescriptionMessage(var key: String = "description", var data: String)

data class RoomId(val id: String)

data class RoomForApp(var roomID: String, var connections: HashMap<WebSocketSession, User>)

data class RoomForRedis(var issueDescription: String, var showVotes: Boolean, var users: Array<User>)

