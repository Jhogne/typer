package com.jhogne.typer;

import java.util.HashMap;
import java.util.Random;

public class RoomHandler {
    private static HashMap<String, Room> rooms = new HashMap<>();

    public static RoomMessage createRoom(){
        String roomId = generateId();
        while(rooms.containsKey(roomId)) {
            roomId = generateId();
        }
        Room room = new Room(roomId);
        int memberId = room.addMember();
        rooms.put(roomId, room);
        return new RoomMessage(roomId, memberId);
    }

    public static Room getRoom(String id){
        return rooms.getOrDefault(id, null);
    }

    public static int joinRoom(String roomId) {
        if(rooms.containsKey(roomId)) {
            return rooms.get(roomId).addMember();
        }
        return -1;
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

    public static void playerFinished(String roomId, int memberId) {
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
