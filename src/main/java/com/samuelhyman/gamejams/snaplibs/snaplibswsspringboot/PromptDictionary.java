package com.samuelhyman.gamejams.snaplibs.snaplibswsspringboot;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.stereotype.Service;

@Service
public class PromptDictionary {
  private List<String> prompts = new ArrayList<>();

  @PostConstruct
  public void populatePrompts() {
    prompts.add("Make an angry face.");
    prompts.add("Make a sad face.");
    prompts.add("Big smile!");
    prompts.add("Your pet goldfish just died.");
    prompts.add("What's that smell?!?!");
    prompts.add("Someone's checking out your boo.");
    prompts.add("You realized you aren't wearing any pants.");
    prompts.add("You just stepped on a Lego(tm).");
    prompts.add("That face your dog makes when it wasn't him.");
    prompts.add("You've just finished climbing Mt. Everest.");
    prompts.add("You've just woke up.");
    prompts.add("Give your best pirate impression.");
    prompts.add("Imitate {}.");
    prompts.add("Surprise!");
    prompts.add("Laugh!");
    prompts.add("The guy next to you just farted loudly.");
    prompts.add("Blow a kiss!");
    prompts.add("Flirty wink!");
    prompts.add("Trying to get your crush's attention.");
    prompts.add("You are out of toliet paper.");
    prompts.add("You just missed the bus.");
    prompts.add("You left your wallet at home.");
    prompts.add("Making it to the changer with your phone at 1%.");
    prompts.add("Duckface!");
    prompts.add("Scream!");
    prompts.add("Staring down the biggest spider you've ever seen.");
    prompts.add("When someone asks you to share your tots.");
    prompts.add("Thug life/mugshot.");
    prompts.add("When you realize Trump is your president.");
    prompts.add("That movement before the drop on the roller coaster.");
    prompts.add("For Sparta!");
    prompts.add("You've just tasted the most sour lemon ever.");
  }

  public List<String> getPrompts() {
    return new ArrayList<>(prompts); // Intentional copy
  }
}
