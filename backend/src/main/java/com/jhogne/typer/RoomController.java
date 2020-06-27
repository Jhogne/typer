package com.jhogne.typer;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

import java.util.HashMap;
import java.util.Random;

@Controller
public class RoomController {

    @MessageMapping("/update")
    @SendTo("/topic/room")
    public Room update(RoomMessage msg) {
        return RoomHandler.getRoom(msg.getId());
    }

    @MessageMapping("/update")
    @SendTo("/topic/room")
    public Room leave(RoomMessage msg) {
        RoomHandler.leaveRoom(msg.getId());
        return RoomHandler.getRoom(msg.getId());
    }
}
