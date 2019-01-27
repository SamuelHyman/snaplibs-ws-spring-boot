package com.samuelhyman.gamejams.snaplibs.snaplibswsspringboot.ws;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.samuelhyman.gamejams.snaplibs.snaplibswsspringboot.PromptDictionary;
import com.samuelhyman.gamejams.snaplibs.snaplibswsspringboot.SceneDictionary;
import com.samuelhyman.gamejams.snaplibs.snaplibswsspringboot.model.GameRoom;
import com.samuelhyman.gamejams.snaplibs.snaplibswsspringboot.model.GameRound;
import com.samuelhyman.gamejams.snaplibs.snaplibswsspringboot.model.Player;
import com.samuelhyman.gamejams.snaplibs.snaplibswsspringboot.model.Scene;
import com.samuelhyman.gamejams.snaplibs.snaplibswsspringboot.model.Snap;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class SocketHandler extends TextWebSocketHandler {

  private static final Type MAP_STRING_STRING_TYPE = new TypeToken<Map<String, String>>(){}.getType();

  @Autowired
  private SceneDictionary sceneDictionary;

  @Autowired
  private Gson gson;

  @Autowired
  private PromptDictionary promptDictionary;

  private Random random = new Random();
  private Map<WebSocketSession, Player> players = new HashMap<>();
  private Map<String, GameRoom> playerToRoom = new HashMap<>();
  private Map<Integer, GameRoom> rooms = new HashMap<>();

  private AtomicInteger roomIdSequence = new AtomicInteger(1000);

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

    if ("judge".equals(action)) {
      handleJudging(session, data);
    }

  }

  private void createNewRoom(WebSocketSession session, Map<String, String> data) throws Exception {
    GameRoom room = new GameRoom();
    room.setId(roomIdSequence.getAndIncrement());
    room.setRemainingScenes(sceneDictionary.getScenes());
    room.setRemainingPrompts(promptDictionary.getPrompts());
    Player host = new Player();
    host.setName(data.get("name"));
    host.setSocket(session);

    room.setHost(host);
    room.getPlayers().add(host);

    rooms.put(room.getId(), room);
    playerToRoom.put(host.getSocket().getId(), room);
    players.put(session, host);

    Map<String, String> response = new HashMap<>();
    response.put("state", "lobby");
    response.put("room", room.getId().toString());
    send(response, host);
  }

  private void addPlayerToRoom(WebSocketSession session, Map<String, String> data) throws IOException {
    GameRoom room = rooms.get(Integer.valueOf(data.get("room")));

    String name = data.get("name");

    for (Player p : room.getPlayers()) {
      if (name.equalsIgnoreCase(p.getName())) {
        Map<String, String> response = new HashMap<>();
        response.put("error", "player with name already exists");
        send(response, session);
        return;
      }
    }

    Player newPlayer = new Player();
    newPlayer.setSocket(session);
    newPlayer.setName(name);

    room.getPlayers().add(newPlayer);
    room.getMatchUps().put(newPlayer, new ArrayList<>());
    players.put(session, newPlayer);

    playerToRoom.put(newPlayer.getSocket().getId(), room);

    Map<String, String> response = new HashMap<>();
    response.put("state", "lobby");

    send(response, newPlayer);

    Map<String, Object> joinNotify = new HashMap<>();
    response.put("state", "playerjoin");

    List<String> players = room.getPlayers().stream().map(Player::getName).collect(Collectors.toList());
    joinNotify.put("players", players);

    send(joinNotify, room.getPlayers());
  }

  private void handleJudging(WebSocketSession session, Map<String,String> data) throws IOException {
    Player player = players.get(session);
    GameRoom room = playerToRoom.get(player.getSocket().getId());

    String vote = data.get("vote");

    if ("1".equals(vote)) {
      room.getCurrentRound().getSnap1().setVotes(room.getCurrentRound().getSnap1().getVotes() + 1);
    }

    if ("2".equals(vote)) {
      room.getCurrentRound().getSnap2().setVotes(room.getCurrentRound().getSnap2().getVotes() + 1);
    }

    Map<String, String> goBackToWaiting = new HashMap<>();
    goBackToWaiting.put("state", "waiting");
    goBackToWaiting.put("message", "waiting on other judge");

    send(goBackToWaiting, player);

    if (room.getCurrentRound().getSnap1().getVotes() + room.getCurrentRound().getSnap2().getVotes() == room.getCurrentRound().getJudges().size()) {
      Map<String, String> response = new HashMap<>();
      response.put("state", "results");
      response.put("scene", room.getCurrentRound().getScene().getName());
      response.put("player1", room.getCurrentRound().getPlayer1().getName());
      response.put("image1", room.getCurrentRound().getSnap1().getData());
      response.put("score1", String.valueOf(room.getCurrentRound().getSnap1().getVotes()));
      response.put("player2", room.getCurrentRound().getPlayer2().getName());
      response.put("image2", room.getCurrentRound().getSnap2().getData());
      response.put("score2", String.valueOf(room.getCurrentRound().getSnap2().getVotes()));

      send(response, room.getPlayers());

      scheduleRoundLogic(room, 6000);
    }

  }

  @Override
  public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
    log.error("Caught exception in session " + session.getId(), exception);
  }

  @Override
  public boolean supportsPartialMessages() {
    return false;
  }

  private void handleSnap(WebSocketSession session, Map<String,String> data) throws IOException {
    Player player = players.get(session);
    GameRoom room = playerToRoom.get(player.getSocket().getId());

    // Get snap and add to room snaps
    Snap snap = new Snap(data.get("image"), data.get("slot"), 0);

    if ("1".equals(snap.getSlot())) {
      room.getCurrentRound().setSnap1(snap);
    }

    if ("2".equals(snap.getSlot())) {
      room.getCurrentRound().setSnap2(snap);
    }

    // Add to player's image list
    player.getImages().add(snap);

    // Send snapper back to waiting
    Map<String, String> response = new HashMap<>();
    response.put("state", "wait");

    send(response, player);

    // If we have two uploads, run judge logic
    if (room.getCurrentRound().getSnap1() != null && room.getCurrentRound().getSnap2() != null) {
      // Grab all players, remove image uploaders to get the list of judges
      List<Player> players = room.getPlayers();

      Map<String, String> judgePacket = new HashMap<>();
      judgePacket.put("state", "judge");
      judgePacket.put("scene", room.getCurrentRound().getScene().getName());
      judgePacket.put("player1", room.getCurrentRound().getPlayer1().getName());
      judgePacket.put("image1", room.getCurrentRound().getSnap1().getData());
      judgePacket.put("player2", room.getCurrentRound().getPlayer2().getName());
      judgePacket.put("image2", room.getCurrentRound().getSnap2().getData());

      for (Player p : players) {
        Map<String, String> playerPacket = new HashMap<>(judgePacket);
        playerPacket.put("isJudge", String.valueOf(room.getCurrentRound().getJudges().contains(p)));
        send(playerPacket, p);
      }
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
    GameRoom room = playerToRoom.get(host.getSocket().getId());

    if (room.getPlayers().size() <= 2) {
      Map<String, String> response = new HashMap<>();
      response.put("error", "not enough players");
      host.sendMessage(new TextMessage(gson.toJson(response)));
      return;
    }

    room.setRemainingRounds(room.getPlayers().size() * 2);

    Map<String, String> response = new HashMap<>();
    response.put("state", "wait");

    send(response, room.getPlayers());

    scheduleRoundLogic(room, 3000);
  }

  private void scheduleRoundLogic(GameRoom room, long millis) {
    new Thread(() -> {
      sleep(millis);
      try {
        runRoundLogic(room);
      } catch (IOException e) {
        e.printStackTrace();
      }
    }).start();
  }

  private void runRoundLogic(GameRoom room) throws IOException {

    room.getRounds().put(room.getRounds().size() + 1, room.getCurrentRound());

    GameRound round = new GameRound();
    room.setCurrentRound(round);

    // Handle end game
    room.setRemainingRounds(room.getRemainingRounds() - 1);

    if (room.getRemainingRounds() <= 0) {
      Map<String, String> scores = new HashMap<>();

      for(Player p : room.getPlayers()) {
        scores.put(p.getName(), String.valueOf(p.getScore()));
      }

      // Game finished
      Map<String, Object> response = new HashMap<>();
      response.put("state", "final");
      response.put("scores", scores);

      send(response, room.getPlayers());

      return;
    }

    // Pick the scene
    List<Scene> remainingScenes = room.getRemainingScenes();
    if (remainingScenes.size() <= 0) {
      remainingScenes.addAll(sceneDictionary.getScenes());
    }

    // Pick two prompts
    List<String> remainingPrompts = room.getRemainingPrompts();
    if (remainingPrompts.size() <= 0 ) {
      remainingPrompts.addAll(promptDictionary.getPrompts());
    }

    String promptA = remainingPrompts.remove(random.nextInt(remainingPrompts.size()));
    String promptB = remainingPrompts.remove(random.nextInt(remainingPrompts.size()));

    Scene scene = remainingScenes.remove(random.nextInt(remainingScenes.size()));
    round.setScene(scene);

    // Pick the players, first pick a random player, and then pick a random second player that is not the first player
    List<Player> players = room.getPlayers();
    int slot1 = random.nextInt(players.size());
    int slot2 = slot1;

    while(slot1 == slot2) {
      slot2 = random.nextInt(players.size());
    }

    round.setPlayer1(players.get(slot1));
    round.setPlayer2(players.get(slot2));

    Map<String, String> snapA = new HashMap<>();
    snapA.put("state", "snap");
    snapA.put("prompt", promptA);
    snapA.put("scene", round.getScene().getName());
    snapA.put("slot", "1");

    Map<String, String> snapB = new HashMap<>();
    snapB.put("state", "snap");
    snapB.put("prompt", promptB);
    snapB.put("scene", round.getScene().getName());
    snapB.put("slot", "2");

    send(snapA, round.getPlayer1());
    send(snapB, round.getPlayer2());

    ArrayList<Player> remainingPlayers = new ArrayList<>(room.getPlayers());
    remainingPlayers.remove(round.getPlayer1());
    remainingPlayers.remove(round.getPlayer2());

    Map<String, String> response = new HashMap<>();
    response.put("state", "wait");
    response.put("message", "waiting on snappers");
    round.setJudges(remainingPlayers);

    send(response, remainingPlayers);
  }

  private void send(Object object, List<Player> sessions) throws IOException {
    String payload = gson.toJson(object);
    TextMessage webSocketMessage = new TextMessage(payload);

    for (Player s : sessions) {
      s.sendMessage(webSocketMessage);
    }
  }

  private void send(Object object, Player player) throws IOException {
    send(object, player.getSocket());
  }

  private void send(Object object, WebSocketSession session) throws IOException {
    String payload = gson.toJson(object);
    TextMessage webSocketMessage = new TextMessage(payload);

    session.sendMessage(webSocketMessage);
  }

  private void sendPlayerList(WebSocketSession session, Map<String, String> data) throws IOException {
    Player player = players.get(session);
    GameRoom room = playerToRoom.get(player.getSocket().getId());

    List<String> playerNames = room.getPlayers().stream().map(Player::getName).collect(Collectors.toList());

    Map<String, Object> response = new HashMap<>();
    response.put("players", playerNames);

    send(response, player);
  }

  @Override
  public void afterConnectionEstablished(WebSocketSession session) {
    log.info("Connected: {}", session);

    Map<String, String> response = new HashMap<>();
    response.put("connected", "ok");

    try {
      send(response, session);
    } catch(Exception ex) {
      log.error("Caught exception: ", ex);
    }
  }

  @Override
  public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
    log.info("Connected: {}", session);

//    Player player = players.get(session);
//
//    if (null != player) {
//      GameRoom map = playerToRoom.get(player);
//
//      if(null != map) {
//        for(Player p : new ArrayList<>(map.getPlayers())) {
//          Map<String, String> kill = new HashMap<>();
//          kill.put("action", "kill");
//          playerToRoom.remove(player);
//          player.sendMessage(new TextMessage(gson.toJson(kill)));
//          players.remove(p.getSocket());
//        }
//        rooms.remove(map.getId());
//      }
//    }
  }
}