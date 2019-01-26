package com.samuelhyman.gamejams.snaplibs.snaplibswsspringboot.model;

import java.util.List;

import org.springframework.web.socket.WebSocketSession;

import lombok.Data;

@Data
public class Player {
  private String name;
  private WebSocketSession socket;
  private int score;
  private List<String> images;
}
