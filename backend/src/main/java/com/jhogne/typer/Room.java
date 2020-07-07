package com.jhogne.typer;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class Room {
    private String roomId;
    private String text;
    private int winner = -1;
    private List<Player> members;

    public Room(String roomId) {
        this.roomId = roomId;
        this.members = new ArrayList<>();
        this.text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";
    }

    public String getRoomId() {
        return roomId;
    }

    public int getMemberAmount() {
        return members.size();
    }

    public List<Player> getMembers(){
        return members;
    }

    public String getText() {
        return text;
    }

    public int addMember(){
        int newId = 0;
        if(!members.isEmpty()) {
            newId = members.size();
        }
        System.out.println(newId);
        members.add(new Player(newId));
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

    public void updatePlayer(PlayerMessage newState) {
        for(Player p : members) {
            if(p.getId() == (newState.getPlayerId())){
                p.setProgress(newState.getCompleted().length() * 100  / this.text.length());
                p.setWpm(newState.getWpm());
            }
        }
    }

    public Player getMember(int playerId) {
        for (Player p : members) {
            if(p.getId() == playerId) {
                return p;
            }
        }
        return null;
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
