package com.bezkoder.spring.security.postgresql.payload.request;

import jakarta.validation.constraints.NotNull;

public class ParticipantRequest {

    @NotNull
    private int userId;

    @NotNull
    private int eventId;

    private String status; // Accept "pending", "accepted", "refused"

    public long getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getEventId() {
        return eventId;
    }

    public void setEventId(int eventId) {
        this.eventId = eventId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
