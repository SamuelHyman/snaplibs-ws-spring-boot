package com.samuelhyman.gamejams.snaplibs.snaplibswsspringboot.model;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;

@Data
public class GameRound {
  private Scene scene;

  private Player player1;
  private Player player2;

  private Snap snap1;
  private Snap snap2;

  private List<Player> judges = new ArrayList<>();

  private int points1;
  private int points2;

}
