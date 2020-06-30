package com.jhogne.typer;

public class RoomMessage {
    private String roomId;

    private int memberId;

    public RoomMessage() {}

    public RoomMessage(String roomId, int memberId) {
        this.roomId = roomId;
        this.memberId = memberId;
    }

    public String getroomId() {
        return roomId;
    }

    public void setroomId(String roomId) {
        this.roomId = roomId;
    }

    public int getMemberId() {
        return memberId;
    }

    public void setMemberId(int memberId) {
        this.memberId = memberId;
    }
}
