package com.jhogne.typer.Controller;

import com.jhogne.typer.Model.Room;
import com.jhogne.typer.Model.RoomHandler;
import com.jhogne.typer.Model.RoomMessage;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@CrossOrigin
public class RoomHandlerController {

    @GetMapping("/createRoom")
    private RoomMessage createRoom(@RequestParam(value = "user") String playerId) {
        if(playerId.isEmpty()) {
            playerId = "user0";
        }
        String roomId = RoomHandler.createRoom();
        RoomHandler.joinRoom(roomId, playerId);
        return new RoomMessage(roomId, playerId);
    }

    @GetMapping("/joinRoom")
    private String joinRoom(@RequestParam(value = "id") String roomId, @RequestParam(value = "user", required = false) String playerId) throws ResponseStatusException {
        if(playerId.isEmpty()) {
            playerId = RoomHandler.generateName(roomId);
        }
        RoomHandler.joinRoom(roomId, playerId);
        return playerId;
    }

    @GetMapping("/leaveRoom")
    private Room leaveRoom(@RequestParam(value = "roomId") String roomId, @RequestParam(value = "userId") String playerId ) throws Exception{
        if(RoomHandler.getRoom(roomId) != null) {
            RoomHandler.leaveRoom(roomId, playerId);
        }
        throw new Exception("Bad things happened");
    }

    @GetMapping("/getRoom")
    private Room getRoom(@RequestParam(value = "id") String id) {
        return RoomHandler.getRoom(id);
    }


}
