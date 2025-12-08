package com.devfolio.scheduler.model;


import java.time.LocalDateTime;

public class MeetingSlot {
    private String id;
    private String datetime; // ISO String for simplicity with frontend
    private boolean available;

    public MeetingSlot() {
    }

    public MeetingSlot(String id, String datetime, boolean available) {
        this.id = id;
        this.datetime = datetime;
        this.available = available;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDatetime() {
        return datetime;
    }

    public void setDatetime(String datetime) {
        this.datetime = datetime;
    }

    public boolean isAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }
}
