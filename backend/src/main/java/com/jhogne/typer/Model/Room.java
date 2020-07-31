package com.jhogne.typer.Model;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.time.Clock;
import java.time.Instant;
import java.util.*;

/**
 * The representation of a room
 */
public class Room {
    private String roomId;
    private Prompt prompt;
    private HashMap<String, Player> players;
    private List<String> standings;
    private int countdown;
    private long startTime;

    public Room(String roomId) {
        this.roomId = roomId;
        this.players = new HashMap<>();
        this.standings = new ArrayList<>();
        this.prompt = new Prompt("", "");
        this.countdown = -1;
    }

    /**
     * Gets the room id
     *
     * @return The room id
     */
    public String getRoomId() {
        return roomId;
    }

    /**
     * Gets the prompt for the room
     *
     * @return The prompt for the room
     */
    public Prompt getPrompt() {
        return prompt;
    }

    /**
     * Gets a copy of each player in the room
     *
     * @return A list containing a copy of each player in the room
     */
    public List<Player> getPlayers() {
        List<Player> copy = new ArrayList<>();
        for (Player p : players.values()) {
            copy.add(new Player(p.getId(), p.getProgress(), p.getWpm(), p.isReady()));
        }
        return copy;
    }

    /**
     * Gets an individual player in the room
     *
     * @param playerId The id for the player
     * @return The player, or null if not in the room
     */
    public Player getPlayer(String playerId) {
        return players.getOrDefault(playerId, null);
    }

    /**
     * Gets the standing (players that has finished the prompt in order of finishing) for the room
     *
     * @return The standings for the room
     */
    public List<String> getStandings() {
        return standings;
    }

    /**
     * Gets the time the game starts in the room
     *
     * @return The time the game starts
     */
    public long getCountdown() {
        return countdown;
    }

    public void startRoom() {
        startTime = Instant.now().toEpochMilli();
    }

    /**
     * Decrements the countdown by 1, as long as it will remain positive
     */
    public void decrementCountdown() {
        if(countdown > 0) {
            countdown--;
        }
    }
    /**
     * Adds a player to the room. Throws conflict exception if a player with the same name is already in the room
     *
     * @param playerId The id of the player to be added
     */
    public void addPlayer(String playerId) {
        if (players.containsKey(playerId)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT);
        }
        players.put(playerId, new Player(playerId));
    }

    /**
     * Removes a player from the room
     *
     * @param id The id of the player to be removed
     */
    public void removePlayer(String id) {
        players.remove(id);
    }

    /**
     * Updates the state of a player in the room.
     *
     * @param newState The new state of the player
     */
    public void updatePlayer(PlayerMessage newState) {
        if (players.containsKey(newState.getPlayerId())) {
            Player p = players.get(newState.getPlayerId());
            p.setProgress(newState.getCompleted().length() * 100 / Math.max(this.prompt.getText().length(), 1)); // Avoid division by 0 at the start.

            int words = newState.getCompleted().split("\\s+").length;
            double minutes;
            if(p.getEndTime() > 0) {
                minutes = (double) (p.getEndTime() - startTime) / 60000;
            } else {
                minutes = (double) (Instant.now().toEpochMilli() - startTime) / 60000;
            }
            p.setWpm((int) (words / minutes));
            p.setReady(newState.isReady());
        }
    }

    /**
     * Reports that a player has finished the text. That is, adds them to the standings. If player is not in  the room
     * nothing happens
     *
     * @param playerId The id of the player that has finished
     */
    public void playerFinished(String playerId) {
        if (players.containsKey(playerId)) {
            standings.add(playerId);
            players.get(playerId).setEndTime(Instant.now().toEpochMilli());
        }
    }

    /**
     * Resets the game by clearing the standings, updating the start time, setting a new random text, and setting each
     * player to not ready.
     */
    public void reset() {
        standings = new ArrayList<>();
        countdown = 3;
        prompt = TextRetriever.getRandomText();
        for (Player p : players.values()) {
            p.setReady(false);
            p.setProgress(0);
            p.setWpm(0);
        }
    }

    public boolean everyoneReady() {
        for(Player p : players.values()) {
            if(!p.isReady()){
                return false;
            }
        }
        return true;
    }

    /**
     * Gets a unique id that no player in the room is using. The id has the form 'playerX' where X is the lowest
     * number, from 0, available
     *
     * @return A unique id
     */
    public String getUniqueId() {
        String template = "user";
        // Find an available name. Requires at most one more tries than players (taken names) in the room
        for (int i = 0; i < players.size() + 1; i++) {
            if (!players.containsKey(template + i)) {
                return template + i;
            }
        }
        return template;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Room room = (Room) o;
        return Objects.equals(roomId, room.roomId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(roomId);
    }

    @Override
    public String toString() {
        return "Room{" +
                "roomId='" + roomId + '\'' +
                ", prompt='" + prompt + '\'' +
                ", players=" + players +
                ", standings=" + standings +
                ", countdown=" + countdown +
                '}';
    }
}
