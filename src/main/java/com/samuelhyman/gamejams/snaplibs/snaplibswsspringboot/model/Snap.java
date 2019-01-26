package com.samuelhyman.gamejams.snaplibs.snaplibswsspringboot.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Snap {
  private String data;
  private String slot;
  private Integer votes;
}
