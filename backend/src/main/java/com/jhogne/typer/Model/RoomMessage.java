package com.jhogne.typer.Model;

public class RoomMessage {
    private String roomId;

    private String memberId;

    public RoomMessage(String roomId, String memberId) {
        this.roomId = roomId;
        this.memberId = memberId;
    }

    public String getRoomId() {
        return roomId;
    }

    public String getMemberId() {
        return memberId;
    }

    public void setRoomId(String roomId) {
        this.roomId = roomId;
    }

    public void setMemberId(String memberId) {
        this.memberId = memberId;
    }
}
