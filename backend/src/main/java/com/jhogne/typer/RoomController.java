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
    public void leave(@DestinationVariable String roomId, int memberId) {
        RoomHandler.leaveRoom(roomId, memberId);
        this.template.convertAndSend("/topic/room/" + roomId, RoomHandler.getRoom(roomId));
    }

    @MessageMapping("/room/{roomId}/update")
    public void update(@DestinationVariable String roomId) {
        this.template.convertAndSend("/topic/room/" + roomId, RoomHandler.getRoom(roomId));
    }

    @MessageMapping("/room/{roomId}/postState")
    public void postState(@DestinationVariable String roomId, PlayerMessage msg) {
        System.out.println(msg);
        RoomHandler.getRoom(roomId).updatePlayer(msg);
        this.template.convertAndSend("/topic/room/" + roomId, RoomHandler.getRoom(roomId));
    }

    @MessageMapping("/room/{roomId}/finish")
    public void finish(@DestinationVariable String roomId, int player) {
        System.out.println("Winner: " + player);
        RoomHandler.playerFinished(roomId, player);
        this.template.convertAndSend("/topic/room/" + roomId, RoomHandler.getRoom(roomId));
    }

    @MessageMapping("/room/{roomId}/reset")
    public void reset(@DestinationVariable String roomId) {
        RoomHandler.resetRoom(roomId);
        this.template.convertAndSend("/topic/room/" + roomId, RoomHandler.getRoom(roomId));
    }}
