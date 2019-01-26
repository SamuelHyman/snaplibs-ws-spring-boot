package com.samuelhyman.gamejams.snaplibs.snaplibswsspringboot.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import lombok.Data;

@Data
public class GameRound {
  private Scene currentScene;
  private Map<Player, Snap> snaps = new HashMap<>();
  private List<Player> awaitingJudges = new ArrayList<>();
}
