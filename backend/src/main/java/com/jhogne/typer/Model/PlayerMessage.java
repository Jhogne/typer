package com.jhogne.typer.Model;

public class PlayerMessage {
    private String playerId;
    private String completed;
    private long wpm;
    private boolean ready;

    public PlayerMessage(){}

    public PlayerMessage(String playerId, String completed, long wpm, boolean ready) {
        this.playerId = playerId;
        this.completed = completed;
        this.wpm = wpm;
        this.ready = ready;
    }

    public String getPlayerId() {
        return playerId;
    }

    public String getCompleted() {
        return completed;
    }

    public void setCompleted(String completed) {
        this.completed = completed;
    }

    public void setPlayerId(String playerId) {
        this.playerId = playerId;
    }

    public long getWpm() {
        return wpm;
    }

    public void setWpm(long wpm) {
        this.wpm = wpm;
    }

    public void setReady(boolean ready) {
        this.ready = ready;
    }

    public boolean isReady() {
        return ready;
    }

    @Override
    public String toString() {
        return "PlayerMessage{" +
                "playerId=" + playerId +
                ", completed='" + completed + '\'' +
                ", wpm=" + wpm +
                ", ready=" + ready +
                '}';
    }
}
