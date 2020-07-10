package com.jhogne.typer.Model;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;

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
        this.text = "Testing text pls ignore.";
    }

    public String getRoomId() {
        return roomId;
    }

    public String getText() {
        return text;
    }

    public int getPlayerAmount() {
        return players.size();
    }

    public List<Player> getPlayers() {
        List<Player> copy = new ArrayList<>();
        for(Player p : players.values()) {
            copy.add(new Player(p.getId(), p.getProgress(), p.getWpm(),p.isReady()));
        }
        return copy;
    }

    public Player getPlayer(String playerId) {
        return players.getOrDefault(playerId, null);
    }

    public List<String> getStandings() {
        return standings;
    }

    public long getStartTime() {
        return startTime;
    }

    public void addPlayer(String userId) {
        if (players.containsKey(userId)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT);
        }
        players.put(userId, new Player(userId));
    }

    public void removePlayer(String id) {
        players.remove(id);
    }

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

    public void playerFinished(String playerId) {
        if (players.containsKey(playerId)) {
            standings.add(playerId);
        }
    }

    public void reset() {
        // Set text to new one here
        standings = new ArrayList<>();
        startTime = System.currentTimeMillis() + 10000;
        for (Player p : players.values()) {
            p.setReady(false);
        }
    }

    public String getUniqueId() {
        String template = "user";
        // Find an available name. Requires at most one more tries than members (taken names) in the room
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
                ", members=" + players +
                ", standings=" + standings +
                ", startTime=" + startTime +
                '}';
    }
}
