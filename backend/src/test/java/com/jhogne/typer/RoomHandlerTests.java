package com.jhogne.typer;

import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class RoomHandlerTests {

    @Test
    void createRoomTest() {
        RoomMessage response = RoomHandler.createRoom();

        assertEquals(0, response.getMemberId());
        assertEquals(4, response.getroomId().length());

    }

    @Test
    void joinRoomTest() {
        RoomMessage response = RoomHandler.createRoom();
        RoomHandler.joinRoom(response.getroomId());
        Room room = RoomHandler.getRoom(response.getroomId());
        List<Player> members = room.getMembers();

        assertEquals(2, members.size());

        Player p1 = members.get(0);
        Player p2 = members.get(1);

        assertNotEquals(p1.getId(), p2.getId());
    }

    @Test
    void leaveRoomTest() {
        RoomMessage response = RoomHandler.createRoom();
        Room room = RoomHandler.getRoom(response.getroomId());

        assertEquals(1, room.getMembers().size());

        RoomHandler.leaveRoom(response.getroomId(), response.getMemberId());

        assertEquals(0, room.getMembers().size());
    }

    @Test
    void deleteRoomTest() {
        RoomMessage response = RoomHandler.createRoom();
        RoomHandler.leaveRoom(response.getroomId(), response.getMemberId());

        assertNull(RoomHandler.getRoom(response.getroomId()));
    }
}
