package com.jhogne.typer;

import java.util.HashMap;
import java.util.Random;

public class RoomHandler {
    private static HashMap<String, Room> rooms = new HashMap<>();

    public static String createRoom(){
        String id = generateId();
        while(rooms.containsKey(id)) {
            id = generateId();
        }
        rooms.put(id, new Room(id,1));
        return id;
    }

    public static Room getRoom(String id){
        return rooms.getOrDefault(id, null);
    }

    public static boolean joinRoom(String id) {
        if(rooms.containsKey(id)) {
            rooms.get(id).increaseMembers();
            return true;
        }
        return false;
    }

    public static boolean leaveRoom(String id) {
        if(rooms.containsKey(id)) {
            rooms.get(id).decreaseMembers();
            return true;
        }
        return false;
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
