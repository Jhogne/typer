package com.jhogne.typer.Model;

import java.time.Instant;
import java.util.Set;

public class RoomCleaner implements Runnable {
    private final long hours = 60 * 60 * 1000;
    public void run() {
        Set<String> ids = RoomHandler.getAllIds();
        for(String id : ids) {
            long roomCreated = RoomHandler.getCreatedTime(id);
            long now = Instant.now().toEpochMilli();
            if((now - roomCreated) / hours >= 12){
              RoomHandler.deleteRoom(id);
            }
        }
    }
}
