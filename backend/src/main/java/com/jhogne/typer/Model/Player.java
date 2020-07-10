package com.jhogne.typer.Model;

public class Player {
    private String id;
    private long progress;
    private long wpm;
    private boolean ready = true;

    public Player(String id) {
        this.id = id;
    }

    public Player(String id, long progress, long wpm, boolean ready) {
        this.id = id;
        this.progress = progress;
        this.wpm = wpm;
        this.ready = ready;
    }

    public String getId() {
        return id;
    }

    public long getProgress() {
        return progress;
    }

    public void setProgress(long progress) {
        this.progress = progress;
    }

    public void setWpm(long wpm) {
        this.wpm = wpm;
    }

    public long getWpm() {
        return wpm;
    }

    public boolean isReady() {
        return ready;
    }

    public void setReady(boolean ready) {
        this.ready = ready;
    }
}


