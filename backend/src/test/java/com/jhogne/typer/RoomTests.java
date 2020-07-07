package com.jhogne.typer;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class RoomTests {

    @Test
    void addMemberTest() {
        Room testRoom = new Room("abcd");
        int amountBefore = testRoom.getMembers().size();
        testRoom.addMember();
        int amountAfter = testRoom.getMembers().size();
        assertEquals(amountBefore+1, amountAfter);
    }

    @Test
    void updatePlayerTest() {
        Room testRoom = new Room("abcd");
        int playerId = testRoom.addMember();
        Player player = testRoom.getMember(playerId);

        assertEquals(player.getWpm(), 0);
        assertEquals(player.getProgress(), 0);
        assertEquals(player.getId(), 0);

        String roomText = testRoom.getText();
        PlayerMessage updateMsg = new PlayerMessage(playerId, roomText.substring(0,roomText.length() / 4), 50);
        testRoom.updatePlayer(updateMsg);

        assertEquals(player.getId(), 0);
        assertEquals(player.getProgress(), (roomText.length() / 4) * 100 / roomText.length());
        assertEquals(player.getWpm(), 50);
    }
}
