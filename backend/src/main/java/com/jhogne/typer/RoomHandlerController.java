package com.jhogne.typer;

import org.apache.coyote.Response;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.Random;

@RestController
@CrossOrigin
public class RoomHandlerController {

    @GetMapping("/createRoom")
    private RoomMessage createRoom(@RequestParam(value = "user") String userId) {
        if(userId.isEmpty()) {
            userId = "user0";
        }
        return RoomHandler.createRoom(userId);
    }

    @GetMapping("/joinRoom")
    private String joinRoom(@RequestParam(value = "id") String roomId, @RequestParam(value = "user", required = false) String userId) throws ResponseStatusException {
        if(userId.isEmpty()) {
            userId = RoomHandler.generateName(roomId);
        }
        RoomHandler.joinRoom(roomId, userId);
        return userId;
    }

    @GetMapping("/leaveRoom")
    private Room leaveRoom(@RequestParam(value = "roomId") String roomId, @RequestParam(value = "memberId") String memberId ) throws Exception{
        if(RoomHandler.leaveRoom(roomId, memberId)){
            return RoomHandler.getRoom(roomId);
        }
        throw new Exception("Bad things happened");
    }

    @GetMapping("/getRoom")
    private Room getRoom(@RequestParam(value = "id") String id) {
        return RoomHandler.getRoom(id);
    }


}
