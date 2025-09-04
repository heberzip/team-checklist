package com.aggiovato.teamchecklist.checklist;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@CrossOrigin(origins = "*")
public class RootController {

//    @GetMapping("/")
//    public String index() {
//        return "index.html";
//    }

    //    public ResponseEntity<?> root() {
    //        return ResponseEntity
    //            .status(HttpStatus.OK)
    //            .body(Map.of("message", "Root route for API TEAMCHECKLIST"));
    //    }
}
