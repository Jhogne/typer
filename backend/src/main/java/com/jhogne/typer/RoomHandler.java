package com.jhogne.typer;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Random;

public class RoomHandler {
    private static HashMap<String, Room> rooms = new HashMap<>();

    public static RoomMessage createRoom(String userId){
        String roomId = generateId();
        while(rooms.containsKey(roomId)) {
            roomId = generateId();
        }
        Room room = new Room(roomId);
        room.addMember(userId);
        rooms.put(roomId, room);
        return new RoomMessage(roomId, userId);
    }

    public static Room getRoom(String id){
        return rooms.getOrDefault(id, null);
    }

    public static boolean joinRoom(String roomId, String userId) {
        if(rooms.containsKey(roomId)) {
            return rooms.get(roomId).addMember(userId);
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }

    public static boolean leaveRoom(String roomId, int memberId) {
        if(rooms.containsKey(roomId)) {
            rooms.get(roomId).decreaseMembers(memberId);
            if(rooms.get(roomId).getMemberAmount() <= 0) {
                deleteRoom(roomId);
            }
            return true;
        }
        return false;
    }

    public static void playerFinished(String roomId, String memberId) {
        if(rooms.containsKey(roomId)) {
            rooms.get(roomId).playerFinished(memberId);
        }
    }

    public static void deleteRoom(String id) {
        rooms.remove(id);
    }


    public static void resetRoom(String id) {
        rooms.get(id).reset();
    }

    private static String generateId() {
        String chars = "abcdefghijklmnopqrstuvwxyz";
        Random rng = new Random();
        char text[] = new char[4];
        for(int i = 0; i < text.length; i++) {
            text[i] = chars.charAt(rng.nextInt(chars.length()));
        }
        return new String(text);
    }


}
