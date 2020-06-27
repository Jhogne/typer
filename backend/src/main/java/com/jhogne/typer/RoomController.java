package com.jhogne.typer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

import java.util.HashMap;
import java.util.Random;

@Controller
public class RoomController {

    private SimpMessagingTemplate template;

    @Autowired
    public RoomController(SimpMessagingTemplate template) {
        this.template = template;
    }

    @MessageMapping("/room/{roomId}/leave")
    public void leave(@DestinationVariable String roomId) {
        RoomHandler.leaveRoom(roomId);
        this.template.convertAndSend("/topic/room/" + roomId, RoomHandler.getRoom(roomId));
    }

    @MessageMapping("/room/{roomId}/update")
    public void update(@DestinationVariable String roomId) {
        this.template.convertAndSend("/topic/room/" + roomId, RoomHandler.getRoom(roomId));
    }
}
