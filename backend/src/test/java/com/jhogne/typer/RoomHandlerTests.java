package com.jhogne.typer;

import com.jhogne.typer.Model.Player;
import com.jhogne.typer.Model.Room;
import com.jhogne.typer.Model.RoomHandler;
import com.jhogne.typer.Model.RoomMessage;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class RoomHandlerTests {

    @Test
    void createRoomTest() {
        String roomId = RoomHandler.createRoom();

        assertEquals(4, roomId.length());

        Room room = RoomHandler.getRoom(roomId);

        assertNotNull(room);
        assertEquals(0, room.getPlayers().size());
        assertEquals(roomId, room.getRoomId());
        assertEquals(0, room.getStandings().size());
        assertEquals(0, room.getStartTime());
        assertEquals(0, room.getText().length());
    }

    @Test
    void joinRoomTest() {
        String roomId = RoomHandler.createRoom();
        RoomHandler.joinRoom(roomId, "testPlayer0");
        RoomHandler.joinRoom(roomId, "testPlayer1");
        Room room = RoomHandler.getRoom(roomId);
        List<Player> members = room.getPlayers();

        assertEquals(2, members.size());

        Player p1 = members.get(0);
        Player p2 = members.get(1);

        assertNotEquals(p1.getId(), p2.getId());
    }

    @Test
    void leaveRoomTest() {
        String roomId = RoomHandler.createRoom();
        Room room = RoomHandler.getRoom(roomId);
        String playerId = "testPlayer0";
        RoomHandler.joinRoom(roomId, playerId);

        assertEquals(1, room.getPlayers().size());

        RoomHandler.leaveRoom(roomId, playerId);

        assertEquals(0, room.getPlayers().size());
    }

    @Test
    void deleteRoomTest() {
        String roomId = RoomHandler.createRoom();
        String playerId = "testPlayer0";
        RoomHandler.joinRoom(roomId, playerId);
        RoomHandler.leaveRoom(roomId, playerId);

        assertNull(RoomHandler.getRoom(roomId));
    }
}
