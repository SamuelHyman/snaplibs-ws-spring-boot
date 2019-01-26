package com.samuelhyman.gamejams.snaplibs.snaplibswsspringboot.rest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class TestEndpoint {

  @GetMapping("/test")
  public String testEndpoint() {
    log.info("test endpoing hit");
    return "Hello World";
  }

}
