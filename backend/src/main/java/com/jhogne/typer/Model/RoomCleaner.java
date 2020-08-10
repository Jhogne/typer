package com.jhogne.typer.Model;

import java.time.Instant;
import java.util.List;
import java.util.Set;

/**
 * A class that cleans up unused rooms in RoomHandler
 */
public class RoomCleaner implements Runnable {
    private final long hours = 60 * 60 * 1000;
    public void run() {
        List<String> ids = RoomHandler.getAllIds();
        for(String id : ids) {
            long roomCreated = RoomHandler.getCreatedTime(id);
            long now = Instant.now().toEpochMilli();
            if((now - roomCreated) / hours >= 12){
              RoomHandler.deleteRoom(id);
            }
        }
    }
}
