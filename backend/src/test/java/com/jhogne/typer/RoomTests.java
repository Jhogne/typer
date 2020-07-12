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
        int amountBefore = testRoom.getPlayers().size();
        testRoom.addPlayer("a");
        int amountAfter = testRoom.getPlayers().size();
        assertEquals(amountBefore+1, amountAfter);
    }

    @Test
    void updatePlayerTest() {
        Room testRoom = new Room("abcd");
        String playerId = "testPlayer";
        testRoom.addPlayer(playerId);
        Player player = testRoom.getPlayer(playerId);

        assertEquals(0, player.getWpm());
        assertEquals(0, player.getProgress());
        assertEquals(playerId, player.getId());
        assertTrue(player.isReady());

        String roomText = testRoom.getText();
        PlayerMessage updateMsg = new PlayerMessage(playerId, roomText.substring(0,roomText.length() / 4), 50, false);
        testRoom.updatePlayer(updateMsg);

        assertEquals(playerId, player.getId());
        assertEquals((roomText.length() / 4) * 100 / roomText.length(), player.getProgress());
        assertEquals(50, player.getWpm());
        assertFalse(player.isReady());
    }
}
