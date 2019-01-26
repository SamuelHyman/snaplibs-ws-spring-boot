package com.samuelhyman.gamejams.snaplibs.snaplibswsspringboot;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import com.samuelhyman.gamejams.snaplibs.snaplibswsspringboot.ws.SocketHandler;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

  public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
    registry
        .addHandler(new SocketHandler(), "/game")
        .setAllowedOrigins("*");
  }
}