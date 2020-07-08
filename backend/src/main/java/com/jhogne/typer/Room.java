package com.jhogne.typer;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class Room {
    private String roomId;
    private String text;
    private List<Player> members;
    private List<Integer> standings;

    public Room(String roomId) {
        this.roomId = roomId;
        this.members = new ArrayList<>();
        this.standings = new ArrayList<>();
        this.text = "Testing text pls ignore.";
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
        members.add(new Player(newId));
        return newId;
    }

    public boolean decreaseMembers(int id) {
        members.remove(id);
        return true;
    }

    public void reset(){
        // Set text to new one here
        standings = new ArrayList<>();
        for(Player p : members) {
            p.setReady(false);
        }
    }

    public void updatePlayer(PlayerMessage newState) {
        for(Player p : members) {
            if(p.getId() == (newState.getPlayerId())){
                p.setProgress(newState.getCompleted().length() * 100  / this.text.length());
                p.setWpm(newState.getWpm());
                p.setReady(newState.isReady());
                for(Player q : members) {
                    if(!q.isReady()) {
                        return;
                    }
                }
                reset();
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

    public void playerFinished(int playerId) {
        for(Player p : members) {
            if(p.getId() == playerId) {
                standings.add(p.getId());
            }
        }
    }

    public List<Integer> getStandings() {
        return standings;
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
