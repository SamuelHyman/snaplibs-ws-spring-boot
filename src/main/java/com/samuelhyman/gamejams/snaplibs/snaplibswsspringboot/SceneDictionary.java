package com.samuelhyman.gamejams.snaplibs.snaplibswsspringboot;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.stereotype.Service;

import com.samuelhyman.gamejams.snaplibs.snaplibswsspringboot.model.Scene;

@Service
public class SceneDictionary {

  private List<Scene> scenes = new ArrayList<>();

  @PostConstruct
  public void addSceneIds() {
    scenes.add(

        Scene.builder()
        .name("spanish_inquisition")
        .promptA("Look angry!")
        .promptB("Look angry!")
        .build()

    );
  }

  public List<Scene> getScenes() {
    // Intentional defensive copy (we expect modifications to be done on the result of this method)
    return new ArrayList<>(scenes);
  }
}
