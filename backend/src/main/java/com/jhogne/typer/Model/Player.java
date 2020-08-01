package com.jhogne.typer.Model;

public class Player {
    private String id;
    private long progress;
    private int wpm;
    private boolean ready = false;
    private long endTime;

    public Player(String id) {
        this.id = id;
    }

    public Player(String id, long progress, int wpm, boolean ready) {
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

    public int getWpm() {
        return wpm;
    }

    public long getEndTime(){
        return endTime;
    }

    public boolean isReady() {
        return ready;
    }

    public void setProgress(long progress) {
        this.progress = progress;
    }

    public void setWpm(int wpm) {
        this.wpm = wpm;
    }

    public void setReady(boolean ready) {
        this.ready = ready;
    }

    public void setEndTime(long endTime){
        this.endTime = endTime;
    }

    @Override
    public String toString() {
        return "Player{" +
                "id='" + id + '\'' +
                ", progress=" + progress +
                ", wpm=" + wpm +
                ", ready=" + ready +
                ", endTime=" + endTime +
                '}';
    }
}


