package com.jhogne.typer.Model;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.util.*;

/**
 * The representation of a room
 */
public class Room {
    private String roomId;
    private String text;
    private HashMap<String, Player> players;
    private List<String> standings;
    private long startTime;

    public Room(String roomId) {
        this.roomId = roomId;
        this.players = new HashMap<>();
        this.standings = new ArrayList<>();
        this.text = TextRetriever.getRandomText();
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
     * Gets the prompt text for the room
     *
     * @return The prompt text for the room
     */
    public String getText() {
        return text;
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
    public long getStartTime() {
        return startTime;
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
     * Updates the state of a player in the room. If the player is the last to report being ready the game resets.
     *
     * @param newState The new state of the player
     */
    public void updatePlayer(PlayerMessage newState) {
        if (players.containsKey(newState.getPlayerId())) {
            Player p = players.get(newState.getPlayerId());

            p.setProgress(newState.getCompleted().length() * 100 / this.text.length());
            p.setWpm(newState.getWpm());
            p.setReady(newState.isReady());

            for (Player q : players.values()) {
                if (!q.isReady()) {
                    return;
                }
            }
            reset();
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
        }
    }

    /**
     * Resets the game by clearing the standings, updating the start time, setting a new random text, and setting each
     * player to not ready.
     */
    public void reset() {
        standings = new ArrayList<>();
        startTime = System.currentTimeMillis() + 10000;
        text = TextRetriever.getRandomText();
        for (Player p : players.values()) {
            p.setReady(false);
        }
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
                ", text='" + text + '\'' +
                ", players=" + players +
                ", standings=" + standings +
                ", startTime=" + startTime +
                '}';
    }
}
