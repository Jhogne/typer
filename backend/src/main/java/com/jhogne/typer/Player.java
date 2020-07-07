package com.jhogne.typer;

public class Player {
    private int id;
    private long progress;
    private long wpm;

    public Player(int id) {
        this.id = id;
    }

    public int getId() {
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
}


