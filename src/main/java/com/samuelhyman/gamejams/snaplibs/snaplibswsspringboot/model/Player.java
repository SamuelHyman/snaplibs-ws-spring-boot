package com.samuelhyman.gamejams.snaplibs.snaplibswsspringboot.model;

import java.util.List;

import org.springframework.web.socket.WebSocketSession;

import lombok.Data;
import lombok.experimental.Delegate;

@Data
public class Player {
  private String name;
  @Delegate
  private WebSocketSession socket;
  private int score;
  private List<Snap> images;
}
