package com.jhogne.typer;

import java.util.Objects;

public class Room {
    private String id;
    private int members;
    private String text;
    private String winnerWPM = null;

    public Room(String id) {
        this.id = id;
        members = 0;
    }

    public Room(String id, int members) {
        this.id = id;
        this.members = members;
        this.text = "This is the default game text that will be used until proper texts are available.";
    }

    public String getId() {
        return id;
    }

    public int getMembers() {
        return members;
    }

    public String getText() {
        return text;
    }

    public boolean increaseMembers(){
        members++;
        return true;
    }

    public boolean decreaseMembers() {
        members--;
        return true;
    }

    public String getWinnerWPM() {
        return winnerWPM;
    }

    public void setWinnerWPM(String winnerWPM) {
        this.winnerWPM = winnerWPM;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Room room = (Room) o;
        return Objects.equals(id, room.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString(){
        return "id: " + id + "\nmembers: " + members;
    }
}
