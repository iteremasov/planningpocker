package com.planningPocker

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
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
        println("user cole")
        sessionList -= session
    }

    fun sendDataInFront(method: String, room: RoomForRedis, roomID: String) {
        when (method) {
            "firstConnect" -> {
                val message = Message(key = "firstConnect", posts = room.posts, users = room.users, description = room.issueDescription)
                val appRoom = rooms.get(roomID)
                if (appRoom != null) {
                    println("send in front")
                    println(message)
                    println(Gson().toJson(message))
                    appRoom.connections.forEach { emit(it.key, message) }
                } else {
                    println("какая то жопа")
                }
            }
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

        println("connect user))))))))))))")
    }

    public override fun handleTextMessage(session: WebSocketSession, message: TextMessage) {
        var requestParameters = getRoomIDAndUserName(session)
        if (requestParameters.size > 0) {
            var roomID = requestParameters[0]
            var userName = requestParameters[1]
            val json = ObjectMapper().readTree(message?.payload)
            // {type: "join/say", data: "name/msg"}
            println(json)
            when (json.get("key").asText()) {
                "description" -> {
                }
                "showVotes" -> {
                }
                "vote" -> {

                }
                "posts" -> {

                }
                "cleanVotes" -> {

                }
            }
        } else {
            return
        }
    }

    fun emit(session: WebSocketSession, msg: Message) = session.sendMessage(TextMessage(Gson().toJson(msg)))
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
