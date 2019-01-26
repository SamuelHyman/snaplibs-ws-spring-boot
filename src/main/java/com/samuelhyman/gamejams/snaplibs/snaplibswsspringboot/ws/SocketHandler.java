package com.samuelhyman.gamejams.snaplibs.snaplibswsspringboot.ws;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.samuelhyman.gamejams.snaplibs.snaplibswsspringboot.model.GameRoom;
import com.samuelhyman.gamejams.snaplibs.snaplibswsspringboot.model.Player;
import com.samuelhyman.gamejams.snaplibs.snaplibswsspringboot.model.Snap;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class SocketHandler extends TextWebSocketHandler {

  private static final Type MAP_STRING_STRING_TYPE = new TypeToken<Map<String, String>>(){}.getType();

  Map<WebSocketSession, Player> players = new HashMap<>();
  Map<Player, GameRoom> playerToRoom = new HashMap<>();
  Map<Integer, GameRoom> rooms = new HashMap<>();
  Gson gson = new Gson();
  AtomicInteger roomIdSequence = new AtomicInteger(1000);

  private void createNewRoom(WebSocketSession session, Map<String, String> data) throws Exception {
    GameRoom room = new GameRoom();
    room.setId(roomIdSequence.getAndIncrement());

    Player host = new Player();
    host.setName(data.get("name"));
    host.setSocket(session);

    room.setHost(host);
    room.setPlayers(new ArrayList<>());
    room.getPlayers().add(host);
    room.setMatchUps(new HashMap<>());

    rooms.put(room.getId(), room);
    playerToRoom.put(host, room);
    players.put(session, host);

    Map<String, String> response = new HashMap<>();
    response.put("state", "lobby");
    response.put("room", room.getId().toString());
    host.getSocket().sendMessage(new TextMessage(gson.toJson(response)));
  }

  private void addPlayerToRoom(WebSocketSession session, Map<String, String> data) throws IOException {
    Player newPlayer = new Player();
    newPlayer.setSocket(session);
    newPlayer.setName(data.get("name"));

    GameRoom room = rooms.get(Integer.valueOf(data.get("room")));
    room.getPlayers().add(newPlayer);
    room.getMatchUps().put(newPlayer, new ArrayList<>());
    players.put(session, newPlayer);

    playerToRoom.put(newPlayer, room);

    Map<String, String> response = new HashMap<>();
    response.put("state", "lobby");

    newPlayer.sendMessage(new TextMessage(gson.toJson(response)));
  }

  @Override
  public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
    log.info("received: {}", message.getPayload());

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

    if ("start".equals(action)) {
      startGameRoom(session, data);
    }

    if ("snap".equals(action)) {
      handleSnap(session, data);
    }

  }

  private void handleSnap(WebSocketSession session, Map<String,String> data) throws IOException {
    Player player = players.get(session);
    GameRoom room = playerToRoom.get(player);

    Snap snap = new Snap(data.get("image"), Integer.valueOf(data.get("slot")));
    room.getImages().put(player, snap);

    if (room.getImages().size() >= 2) {
      // Grab all players, remove image uploaders to get the list of judges
      List<Player> judges = new ArrayList<>(room.getPlayers());
      judges.removeAll(room.getImages().keySet());

      Map<String, String> judge = new HashMap<>();
      judge.put("state", "judge");
      judge.put("scene", "");

      room.getImages().entrySet().forEach(entry -> {
        judge.put(entry.getValue().getSlot().toString(), entry.getValue().getData());
      });

      player.sendMessage(new TextMessage(gson.toJson(judge)));

    }
  }

  private void sleep(long millis) {
    try {
      Thread.sleep(millis);
    } catch (InterruptedException e) {

    }
  }

  private void startGameRoom(WebSocketSession session, Map<String,String> data) throws IOException {
    Player host = players.get(session);
    GameRoom room = playerToRoom.get(host);

    room.setRemainingRounds(room.getPlayers().size() * 2);

    for(Player p : room.getPlayers()) {
      Map<String, String> response = new HashMap<>();
      response.put("state", "waiting");

      p.getSocket().sendMessage(new TextMessage(gson.toJson(response)));
    }

    scheduleRoundLogic(room);
  }

  private void scheduleRoundLogic(GameRoom room) {
    new Thread(() -> {
      sleep(3000);
      try {
        runRoundLogic(room);
      } catch (IOException e) {
        e.printStackTrace();
      }
    }).start();
  }

  @Data
  @AllArgsConstructor
  public static class Pair {
    private Player player;
    private Integer count;
  }

  private void runRoundLogic(GameRoom room) throws IOException {
    Map<Player, List<Player>> matchups = room.getMatchUps();

    List<Pair> plays = matchups.entrySet().stream().map(e -> new Pair(e.getKey(), e.getValue().size())).sorted(Comparator.comparingInt(a -> a.count)).collect(Collectors.toList());

    Player a = null;
    Player b = null;

    // TODO: Choose participants

    room.getImages().clear();

    Map<String, String> snapA = new HashMap<>();
    snapA.put("state", "snap");
    snapA.put("prompt", "");
    snapA.put("scene", "");
    snapA.put("slot", "1");

    Map<String, String> snapB = new HashMap<>();
    snapB.put("state", "snap");
    snapB.put("prompt", "");
    snapB.put("scene", "");
    snapB.put("slot", "2");

    a.getSocket().sendMessage(new TextMessage(gson.toJson(snapA)));
    b.getSocket().sendMessage(new TextMessage(gson.toJson(snapB)));
  }

  private void sendPlayerList(WebSocketSession session, Map<String, String> data) throws IOException {
    GameRoom room = playerToRoom.get(players.get(session));

    List<String> playerNames = room.getPlayers().stream().map(Player::getName).collect(Collectors.toList());

    Map<String, Object> response = new HashMap<>();
    response.put("players", playerNames);

    session.sendMessage(new TextMessage(gson.toJson(response)));
  }

  @Override
  public void afterConnectionEstablished(WebSocketSession session) {
    log.info("Connected: {}", session);

    Map<String, String> response = new HashMap<>();
    response.put("connected", "ok");

    try {
      session.sendMessage(new TextMessage(gson.toJson(response)));
    } catch(Exception ex) {
      log.error("Caught exception: ", ex);
    }
  }

}