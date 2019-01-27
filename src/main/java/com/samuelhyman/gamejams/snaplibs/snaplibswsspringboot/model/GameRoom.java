package com.samuelhyman.gamejams.snaplibs.snaplibswsspringboot.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import lombok.Data;

@Data
public class GameRoom {
  private Integer id;
  private Player host;
  private List<Player> players = new ArrayList<>();
  private int remainingRounds;
  private Map<Player, List<Player>> matchUps = new HashMap<>();

  private List<Scene> remainingScenes = new ArrayList<>();
  private List<String> remainingPrompts = new ArrayList<>();

  private Map<Integer, GameRound> rounds = new HashMap<>();
  private GameRound currentRound;
}
