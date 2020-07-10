package com.jhogne.typer.Model;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.List;
import java.util.Random;

/**
 * A static class that contains all rooms and forwards requests to the proper room
 */
public class RoomHandler {
    private static HashMap<String, Room> rooms = new HashMap<>();

    /**
     * Creates a new room with a unique room id
     *
     * @return The id of the newly created room
     */
    public static String createRoom() {
        String roomId = generateId();
        while (rooms.containsKey(roomId)) {
            roomId = generateId();
        }
        Room room = new Room(roomId);
        rooms.put(roomId, room);
        return roomId;
    }

    /**
     * Gets a room by it's id, or null if it doesn't exist
     *
     * @param id The id of the room to be retrieved
     * @return The room
     */
    public static Room getRoom(String id) {
        return rooms.getOrDefault(id, null);
    }

    /**
     * A player, given by it's player id, joins a room, given by it's room id . Throws not found exception if room
     * doesn't exist
     *
     * @param roomId The id of the room to join
     * @param playerId The id of the player to join the room
     */
    public static void joinRoom(String roomId, String playerId) {
        if (rooms.containsKey(roomId)) {
            rooms.get(roomId).addPlayer(playerId);
            return;
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }

    /**
     * A player, given by it's player id, leaves a room, given by it's room id.
     *
     * @param roomId   The id of the room to leave
     * @param playerId The id of the player to leave
     */
    public static void leaveRoom(String roomId, String playerId) {
        if (rooms.containsKey(roomId)) {
            rooms.get(roomId).removePlayer(playerId);
            if (rooms.get(roomId).getPlayerAmount() <= 0) {
                rooms.remove(roomId);
            }
        }
    }

    /**
     * Reports a player of a room as finished
     *
     * @param roomId   The room the player has finished
     * @param playerId The player that has finished the text
     */
    public static void playerFinished(String roomId, String playerId) {
        if (rooms.containsKey(roomId)) {
            rooms.get(roomId).playerFinished(playerId);
        }
    }

    /**
     * Resets a room
     *
     * @param id The id of the room to reset
     */
    public static void resetRoom(String id) {
        if (rooms.containsKey(id)) {
            rooms.get(id).reset();
        }
    }

    /**
     * Generates a new unique name for a room
     *
     * @param roomId The id of the room that is used as base
     * @return A name that is unique in the room
     */
    public static String generateName(String roomId) {
        Room room = rooms.get(roomId);
        if (room == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        return room.getUniqueId();
    }

    /**
     * Generates a random room id with 4 lowercase letters
     *
     * @return A random room id
     */
    private static String generateId() {
        String chars = "abcdefghijklmnopqrstuvwxyz";
        Random rng = new Random();
        char[] text = new char[4];
        for (int i = 0; i < text.length; i++) {
            text[i] = chars.charAt(rng.nextInt(chars.length()));
        }
        return new String(text);
    }


}
