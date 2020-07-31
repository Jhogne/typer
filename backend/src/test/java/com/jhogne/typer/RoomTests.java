package com.jhogne.typer;

import com.jhogne.typer.Model.Player;
import com.jhogne.typer.Model.PlayerMessage;
import com.jhogne.typer.Model.Prompt;
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
        testRoom.reset();
        String playerId = "testPlayer";
        testRoom.addPlayer(playerId);
        testRoom.getPrompt().setText("Lorem ipsum dolor sit amet");
        testRoom.startRoom();
        Player player = testRoom.getPlayer(playerId);

        assertEquals(0, player.getWpm());
        assertEquals(0, player.getProgress());
        assertEquals(playerId, player.getId());
        assertFalse(player.isReady());

        String text = testRoom.getPrompt().getText();
        String completed = text.substring(0,text.length()/2);

        PlayerMessage updateMsg = new PlayerMessage(playerId, completed,true);
        testRoom.updatePlayer(updateMsg);

        assertTrue(player.getWpm() > 0);
        assertEquals(playerId, player.getId());
        assertEquals(50, player.getProgress());
        assertTrue(player.isReady());
    }
}
