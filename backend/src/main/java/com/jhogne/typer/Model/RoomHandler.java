package com.jhogne.typer.Model;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.List;
import java.util.Random;

public class RoomHandler {
    private static HashMap<String, Room> rooms = new HashMap<>();

    public static RoomMessage createRoom(String userId) {
        String roomId = generateId();
        while (rooms.containsKey(roomId)) {
            roomId = generateId();
        }
        Room room = new Room(roomId);
        room.addPlayer(userId);
        rooms.put(roomId, room);
        return new RoomMessage(roomId, userId);
    }

    public static Room getRoom(String id) {
        return rooms.getOrDefault(id, null);
    }

    public static void joinRoom(String roomId, String userId) {
        if (rooms.containsKey(roomId)) {
            rooms.get(roomId).addPlayer(userId);
            return;
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }

    public static void leaveRoom(String roomId, String memberId) {
        if (rooms.containsKey(roomId)) {
            rooms.get(roomId).removePlayer(memberId);
            if (rooms.get(roomId).getPlayerAmount() <= 0) {
                rooms.remove(roomId);
            }
        }
    }

    public static void playerFinished(String roomId, String memberId) {
        if (rooms.containsKey(roomId)) {
            rooms.get(roomId).playerFinished(memberId);
        }
    }

    public static void resetRoom(String id) {
        if (rooms.containsKey(id)) {
            rooms.get(id).reset();
        }
    }

    public static String generateName(String roomId) {
        Room room = rooms.get(roomId);
        if (room == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        return room.getUniqueId();
    }

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
