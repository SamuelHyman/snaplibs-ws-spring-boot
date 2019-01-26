package com.samuelhyman.gamejams.snaplibs.snaplibswsspringboot.model;

import java.util.List;
import java.util.UUID;

import lombok.Data;

@Data
public class GameRoom {
  private UUID uuid;
  private Player host;
  private List<Player> players;
}
