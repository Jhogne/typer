package com.jhogne.typer;

import com.jhogne.typer.Model.Player;
import com.jhogne.typer.Model.PlayerMessage;
import com.jhogne.typer.Model.Room;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class RoomTests {

    @Test
    void addMemberTest() {
        Room testRoom = new Room("abcd");
        int amountBefore = testRoom.getMembers().size();
        testRoom.addMember("a");
        int amountAfter = testRoom.getMembers().size();
        assertEquals(amountBefore+1, amountAfter);
    }

    @Test
    void updatePlayerTest() {
        Room testRoom = new Room("abcd");
        String playerId = "testUser";
        testRoom.addMember(playerId);
        Player player = testRoom.getMember(playerId);

        assertEquals(player.getWpm(), 0);
        assertEquals(player.getProgress(), 0);
        assertEquals(player.getId(), "testUser");
        assertTrue(player.isReady());

        String roomText = testRoom.getText();
        PlayerMessage updateMsg = new PlayerMessage(playerId, roomText.substring(0,roomText.length() / 4), 50, false);
        testRoom.updatePlayer(updateMsg);

        assertEquals(player.getId(), "testUser");
        assertEquals(player.getProgress(), (roomText.length() / 4) * 100 / roomText.length());
        assertEquals(player.getWpm(), 50);
        assertFalse(player.isReady());
    }
}
