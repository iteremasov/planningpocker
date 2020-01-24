package com.planningPocker

import com.fasterxml.jackson.databind.ObjectMapper
import com.google.gson.Gson
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.context.annotation.Configuration
import org.springframework.web.socket.*
import org.springframework.web.socket.config.annotation.*
import org.springframework.web.socket.handler.TextWebSocketHandler
import java.util.concurrent.atomic.AtomicLong
import redis.clients.jedis.Jedis


class ChatHandler : TextWebSocketHandler() {
    val jedis = Jedis()
    val connect = jedis.connect()

    val sessionList = HashMap<WebSocketSession, User>()
    var uids = AtomicLong(0)
    val rooms = HashMap<String, RoomForApp>()

    @Throws(Exception::class)
    override fun afterConnectionClosed(session: WebSocketSession, status: CloseStatus) {
        var requestParams = getRoomIDAndUserName(session = session)
        if (requestParams.size > 0) {
            var roomID = requestParams[0]
            var userName = requestParams[1]
            var dataBaseRoomStr = jedis.get(roomID)
            if (dataBaseRoomStr === null) {
                return
            }
            var dataBaseRoom = Gson().fromJson(dataBaseRoomStr, RoomForRedis::class.java)

            var newUsers = dataBaseRoom.users.filter { it -> it.userName != userName }
            if (newUsers.size > 0) {
                dataBaseRoom.users = newUsers.toTypedArray()
                jedis.set(roomID, Gson().toJson(dataBaseRoom))
                var room = rooms.get(roomID)
                if (room === null) {
                    return
                }
                room.connections.minusAssign(session)
                rooms.set(roomID, room)
                sendDataInFront(method = "users", room = dataBaseRoom, roomID = roomID)
            } else {
                jedis.del(roomID)
                rooms.minusAssign(roomID)
            }


        } else {
            return
        }
    }

    fun allVoteCheck(room: RoomForRedis): Boolean {
        var users = room.users.filter { user: User -> user.vote == null }
        if (users.size > 0) {
            return false
        }
        return true
    }

    fun sendDataInFront(method: String, room: RoomForRedis, roomID: String) {
        val appRoom = rooms.get(roomID)
        if (appRoom != null) {

            when (method) {
                "firstConnect" -> {
                    if (allVoteCheck(room) || room.showVotes) {
                        val message = Message(key = "firstConnect", posts = room.posts, users = room.users, description = room.issueDescription)
                        appRoom.connections.forEach { emit(it.key, message) }
                    } else {
                        appRoom.connections.forEach {
                            var users = room.users.map { it.copy() }
                            users.map { user ->
                                if (user.userName != it.value.userName) {
                                    user.vote = null
                                }
                            }
                            val message = Message(key = "firstConnect", posts = room.posts, users = users, description = room.issueDescription)
                            emit(it.key, message)
                        }
                    }

                }
                "users" -> {
                    if (allVoteCheck(room) || room.showVotes) {
                        var users = room.users.map { it.copy() }
                        val message = UsersMessage(data = users)
                        appRoom.connections.forEach { emit(it.key, message) }
                        return
                    } else {
                        appRoom.connections.forEach {
                            var users = room.users.map { it.copy() }
                            users.map { user ->
                                if (user.userName != it.value.userName) {
                                    user.vote = null
                                }
                            }
                            val message = UsersMessage(data = users)
                            emit(it.key, message)
                        }
                    }

                }
                "description" -> {
                    val message = DescriptionMessage(data = room.issueDescription)
                    appRoom.connections.forEach { emit(it.key, message) }
                }
                "posts" -> {
                    val message = PostsMessage(posts = room.posts)
                    appRoom.connections.forEach { emit(it.key, message) }
                }
            }
        } else {
            println("WTF???")
        }
    }

    fun setWS(roomID: String, session: WebSocketSession, user: User) {
        val room = rooms.get(roomID)
        if (room === null) {
            val connections = HashMap<WebSocketSession, User>()
            connections.put(session, user)
            val newRoom = RoomForApp(roomID = roomID, connections = connections)
            rooms.put(roomID, newRoom)
        } else {
            room.connections.put(session, user)
        }
    }

    private fun getRoomIDAndUserName(session: WebSocketSession): Array<String> {
        val pathArr = session.uri?.path?.split("/")
        if (pathArr != null) {
            var roomID = pathArr.get(3)
            var userName = pathArr.get(4)
            return arrayOf(roomID, userName)
        } else {
            return emptyArray()
        }

    }

    public override fun afterConnectionEstablished(session: WebSocketSession) {
        var requestParameters = getRoomIDAndUserName(session)
        if (requestParameters.size > 0) {
            var roomID = requestParameters[0]
            var userName = requestParameters[1]
            var roomOFredis = jedis.get(roomID)
            if (roomOFredis === null) {
                session.close(); return
            }

            var roomRedis = Gson().fromJson(roomOFredis, RoomForRedis::class.java)
            var user = User(userName = userName, vote = null)
            if (roomRedis.users.contains(user)) {
                session.close(); return
            }
            roomRedis.users += user
            jedis.set(roomID, Gson().toJson(roomRedis))
            setWS(roomID, session, user)
            sendDataInFront(method = "firstConnect", roomID = roomID, room = roomRedis)
        } else {
            session.close(); return
        }
    }

    public override fun handleTextMessage(session: WebSocketSession, message: TextMessage) {
        var requestParameters = getRoomIDAndUserName(session)
        if (requestParameters.size > 0) {
            var roomID = requestParameters[0]
            var userName = requestParameters[1]
            val json = ObjectMapper().readTree(message?.payload)
            var dataBaseRoomSTR = jedis.get(roomID)
            var dataBaseRoom = Gson().fromJson(dataBaseRoomSTR, RoomForRedis::class.java)
            when (json.get("key").asText()) {
                "description" -> {
                    var description = json.get("data").asText()
                    dataBaseRoom.issueDescription = description
                    jedis.set(roomID, Gson().toJson(dataBaseRoom))
                    sendDataInFront(method = "description", room = dataBaseRoom, roomID = roomID)
                }
                "showVotes" -> {
                    dataBaseRoom.showVotes = true
                    jedis.set(roomID, Gson().toJson(dataBaseRoom))
                    sendDataInFront(method = "users", room = dataBaseRoom, roomID = roomID)
                }
                "vote" -> {
                    var vote = json.get("data").asText().toFloat()
                    dataBaseRoom.users.map { user ->
                        if (user.userName == userName) {
                            user.vote = vote
                        }
                    }
                    jedis.set(roomID, Gson().toJson(dataBaseRoom))
                    sendDataInFront(method = "users", room = dataBaseRoom, roomID = roomID)
                }
                "posts" -> {
                    var JSONpost = json.get("data")
                    var post = Post(user = JSONpost.get("user").asText(), post = JSONpost.get("post").asText())
                    dataBaseRoom.posts += post
                    jedis.set(roomID, Gson().toJson(dataBaseRoom))
                    sendDataInFront(method = "posts", room = dataBaseRoom, roomID = roomID)
                }
                "cleanVotes" -> {
                    dataBaseRoom.users.map { user -> user.vote = null }
                    jedis.set(roomID, Gson().toJson(dataBaseRoom))
                    sendDataInFront(method = "users", room = dataBaseRoom, roomID = roomID)

                }
            }
        } else {
            return
        }
    }

    fun emit(session: WebSocketSession, msg: Any) = session.sendMessage(TextMessage(Gson().toJson(msg)))
}

@Configuration
@EnableWebSocket
class WSConfig : WebSocketConfigurer {
    override fun registerWebSocketHandlers(registry: WebSocketHandlerRegistry) {
        registry.addHandler(ChatHandler(), "/planning/room/{roomKey}/{userName}").setAllowedOrigins("*")
    }
}

@SpringBootApplication
class ChatApplication
