package com.planningPocker

import org.springframework.web.socket.WebSocketSession

data class User(val userName: String, var vote: Int?)

data class Message(val key: String, var users: Array<User>,var description: String,var posts: Array<Post>)

data class RoomId(val id: String)

data class RoomForApp(var roomID: String, var connections: HashMap<WebSocketSession, User>)

data class RoomForRedis(var issueDescription: String, var showVotes: Boolean, var users: Array<User>, var posts: Array<Post>)

data class Post(var user: String, var post: String)
