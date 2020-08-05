package com.jhogne.typer.Controller;

import com.jhogne.typer.Model.PlayerMessage;
import com.jhogne.typer.Model.Room;
import com.jhogne.typer.Model.RoomHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.server.ResponseStatusException;

@Controller
public class RoomController {

    private SimpMessagingTemplate template;

    @Autowired
    public RoomController(SimpMessagingTemplate template) {
        this.template = template;
    }

    @MessageMapping("/room/{roomId}/leave")
    public void leave(@DestinationVariable String roomId, String playerId) {
        try {
            RoomHandler.leaveRoom(roomId, playerId);
            sendRoomMessage(roomId);
        } catch(ResponseStatusException e) {
            sendEmptyRoom(roomId);
        }
    }

    @MessageMapping("/room/{roomId}/update")
    public void update(@DestinationVariable String roomId) {
        sendRoomMessage(roomId);
    }

    @MessageMapping("/room/{roomId}/postState")
    public void postState(@DestinationVariable String roomId, PlayerMessage msg) {
        try {
            RoomHandler.getRoom(roomId).updatePlayer(msg);
        } catch (ResponseStatusException e) {
            sendEmptyRoom(roomId);
        }
        if (RoomHandler.getRoom(roomId).everyoneReady()) {
            RoomHandler.resetRoom(roomId);
            countdown(RoomHandler.getRoom(roomId));
        } else {
            sendRoomMessage(roomId);
        }
    }

    @MessageMapping("/room/{roomId}/finish")
    public void finish(@DestinationVariable String roomId, String player) {
        try {
            RoomHandler.playerFinished(roomId, player);
            sendRoomMessage(roomId);
        } catch (ResponseStatusException e) {
            sendEmptyRoom(roomId);
        }
    }

    private void sendRoomMessage(String roomId) {
        try {
            Room room = RoomHandler.getRoom(roomId);
            this.template.convertAndSend("/topic/room/" + roomId, room);
        } catch(ResponseStatusException e) {
            sendEmptyRoom(roomId);
        }
    }

    private void sendEmptyRoom(String roomId) {
        this.template.convertAndSend("/topic/room" + roomId, "");
    }

    private void countdown(Room room) {
        while(room.getCountdown() > 0) {
            sendRoomMessage(room.getRoomId());
            room.decrementCountdown();
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        room.startRoom();
        sendRoomMessage(room.getRoomId());
    }
}
