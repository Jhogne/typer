package com.jhogne.typer;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Random;

@RestController
@CrossOrigin
public class RoomHandlerController {

    @GetMapping("/createRoom")
    private RoomMessage createRoom() {
        return RoomHandler.createRoom();
    }

    @GetMapping("/joinRoom")
    private int joinRoom(@RequestParam(value = "id") String roomId) throws Exception{
        return RoomHandler.joinRoom(roomId);
    }

    @GetMapping("/leaveRoom")
    private Room leaveRoom(@RequestParam(value = "roomId") String roomId, @RequestParam(value = "memberId") int memberId ) throws Exception{
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
