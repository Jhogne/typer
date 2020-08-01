package com.jhogne.typer.Model;

public class RoomMessage {
    private String roomId;
    private String playerId;

    public RoomMessage(String roomId, String playerId) {
        this.roomId = roomId;
        this.playerId = playerId;
    }

    public String getRoomId() {
        return roomId;
    }

    public String getplayerId() {
        return playerId;
    }

    public void setRoomId(String roomId) {
        this.roomId = roomId;
    }

    public void setplayerId(String playerId) {
        this.playerId = playerId;
    }

    @Override
    public String toString() {
        return "RoomMessage{" +
                "roomId='" + roomId + '\'' +
                ", playerId='" + playerId + '\'' +
                '}';
    }
}
