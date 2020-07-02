package com.jhogne.typer;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class Room {
    private String roomId;
    private String text;
    private int winner = -1;
    private List<Integer> members;

    public Room(String roomId) {
        this.roomId = roomId;
        this.members = new ArrayList<>();
        this.text = "This is the default game text that will be used until proper texts are available.";
    }

    public String getRoomId() {
        return roomId;
    }

    public int getMemberAmount() {
        return members.size();
    }

    public List<Integer> getMembers(){
        return members;
    }

    public String getText() {
        return text;
    }

    public int addMember(){
        int newId = 0;
        if(!members.isEmpty()) {
            newId = members.get(members.size() - 1) + 1;
        }
        System.out.println(newId);
        members.add(newId);
        return newId;
    }

    public boolean decreaseMembers(int id) {
        members.remove(id);
        return true;
    }

    public int getWinner() {
        return winner;
    }

    public void setWinner(int winner) {
        this.winner = winner;
    }

    public void reset(){
        setWinner(-1);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Room room = (Room) o;
        return Objects.equals(roomId, room.roomId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(roomId);
    }

    @Override
    public String toString(){
        return "id: " + roomId + "\nmembers: " + members;
    }
}
