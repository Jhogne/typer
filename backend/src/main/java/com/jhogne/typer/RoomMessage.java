package com.jhogne.typer;

public class RoomMessage {
    private String roomId;

    private String memberId;

    public RoomMessage() {}

    public RoomMessage(String roomId, String memberId) {
        this.roomId = roomId;
        this.memberId = memberId;
    }

    public String getroomId() {
        return roomId;
    }

    public void setroomId(String roomId) {
        this.roomId = roomId;
    }

    public String getMemberId() {
        return memberId;
    }

    public void setMemberId(String memberId) {
        this.memberId = memberId;
    }
}
