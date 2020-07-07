package com.jhogne.typer;

public class PlayerMessage {
    private int playerId;
    private String completed;
    private long wpm;

    public PlayerMessage(){}

    public PlayerMessage(int playerId, String completed, long wpm) {
        this.playerId = playerId;
        this.completed = completed;
        this.wpm = wpm;
    }

    public int getPlayerId() {
        return playerId;
    }

    public String getCompleted() {
        return completed;
    }

    public void setCompleted(String completed) {
        this.completed = completed;
    }

    public void setPlayerId(int playerId) {
        this.playerId = playerId;
    }

    public long getWpm() {
        return wpm;
    }

    public void setWpm(long wpm) {
        this.wpm = wpm;
    }
}
