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
    private String createRoom() {
        return RoomHandler.createRoom();
    }

    @GetMapping("/joinRoom")
    private boolean joinRoom(@RequestParam(value = "id") String id) throws Exception{
        if(RoomHandler.joinRoom(id)){
            return true;
        }
        throw new Exception("Bad things happened");
    }

    @GetMapping("/leaveRoom")
    private Room leaveRoom(@RequestParam(value = "id") String id) throws Exception{
        if(RoomHandler.leaveRoom(id)){
            return RoomHandler.getRoom(id);
        }
        throw new Exception("Bad things happened");
    }

    @GetMapping("/getRoom")
    private Room getRoom(@RequestParam(value = "id") String id) {
        return RoomHandler.getRoom(id);
    }


}
