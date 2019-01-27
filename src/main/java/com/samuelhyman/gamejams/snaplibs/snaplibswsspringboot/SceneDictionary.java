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
    scenes.add(Scene.builder().name("004.png").build());
    scenes.add(Scene.builder().name("005.png").build());
    scenes.add(Scene.builder().name("006.png").build());
    scenes.add(Scene.builder().name("007.png").build());
    scenes.add(Scene.builder().name("008.png").build());
    scenes.add(Scene.builder().name("009.png").build());
    scenes.add(Scene.builder().name("010.png").build());
    scenes.add(Scene.builder().name("011.png").build());
    scenes.add(Scene.builder().name("013.png").build());
    scenes.add(Scene.builder().name("014.png").build());
    scenes.add(Scene.builder().name("015.png").build());
    scenes.add(Scene.builder().name("016.png").build());
    scenes.add(Scene.builder().name("017.png").build());
    scenes.add(Scene.builder().name("019.png").build());
    scenes.add(Scene.builder().name("020.png").build());
    scenes.add(Scene.builder().name("021.png").build());
    scenes.add(Scene.builder().name("024.png").build());
  }

  public List<Scene> getScenes() {
    // Intentional defensive copy (we expect modifications to be done on the result of this method)
    return new ArrayList<>(scenes);
  }
}


/*

*/