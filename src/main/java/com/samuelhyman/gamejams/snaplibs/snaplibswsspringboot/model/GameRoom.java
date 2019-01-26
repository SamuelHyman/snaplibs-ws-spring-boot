package com.samuelhyman.gamejams.snaplibs.snaplibswsspringboot.model;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import lombok.Data;

@Data
public class GameRoom {
  private Integer id;
  private Player host;
  private List<Player> players;
  private int remainingRounds;

  private Map<Player, List<Player>> matchUps;

  private Map<Player, Snap> images = new HashMap();
}
