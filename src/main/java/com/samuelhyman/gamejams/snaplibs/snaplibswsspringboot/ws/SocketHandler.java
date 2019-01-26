package com.samuelhyman.gamejams.snaplibs.snaplibswsspringboot.ws;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.samuelhyman.gamejams.snaplibs.snaplibswsspringboot.model.GameRoom;
import com.samuelhyman.gamejams.snaplibs.snaplibswsspringboot.model.Player;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class SocketHandler extends TextWebSocketHandler {

  private static final Type MAP_STRING_STRING_TYPE = new TypeToken<Map<String, String>>(){}.getType();

  Map<WebSocketSession, Player> players = new HashMap<>();
  Map<Player, GameRoom> playerToRoom = new HashMap<>();
  Map<UUID, GameRoom> rooms = new HashMap<>();

  @Autowired
  Gson gson;

  private void createNewRoom(WebSocketSession session, Map<String, String> data) throws IOException {
    GameRoom room = new GameRoom();
    room.setUuid(UUID.randomUUID());

    Player host = new Player();
    host.setName(data.get("name"));
    host.setSocket(session);

    room.setHost(host);
    room.setPlayers(new ArrayList<>());
    room.getPlayers().add(host);

    rooms.put(room.getUuid(), room);
    playerToRoom.put(host, room);
    players.put(session, host);

    Map<String, String> response = new HashMap<>();
    response.put("room", room.getUuid().toString());

    host.getSocket().sendMessage(new TextMessage(gson.toJson(response)));
  }

  private void addPlayerToRoom(WebSocketSession session, Map<String, String> data) {
    Player newPlayer = new Player();
    newPlayer.setSocket(session);
    newPlayer.setName(data.get("name"));

    GameRoom room = rooms.get(UUID.fromString(data.get("room")));
    room.getPlayers().add(newPlayer);
    players.put(session, newPlayer);

    playerToRoom.put(newPlayer, room);
  }

  @Override
  public void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {
    Map<String, String> data = new Gson().fromJson(message.getPayload(), MAP_STRING_STRING_TYPE);

    final String action = data.get("action");

    if ("create".equals(action)) {
      createNewRoom(session, data);
    }

    if ("join".equals(action)) {
      addPlayerToRoom(session, data);
    }

    if ("list".equals(action)) {
      sendPlayerList(session, data);
    }

  }

  private void sendPlayerList(WebSocketSession session, Map<String, String> data) throws IOException {
    GameRoom room = playerToRoom.get(players.get(session));

    List<String> playerNames = room.getPlayers().stream().map(Player::getName).collect(Collectors.toList());

    session.sendMessage(new TextMessage(gson.toJson(playerNames)));
  }

  @Override
  public void afterConnectionEstablished(WebSocketSession session) {
    log.info("Connected: {}", session);
  }
}