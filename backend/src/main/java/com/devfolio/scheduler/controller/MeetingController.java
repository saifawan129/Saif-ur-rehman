package com.devfolio.scheduler.controller;

import com.devfolio.scheduler.model.MeetingRequest;
import com.devfolio.scheduler.model.MeetingSlot;
import com.devfolio.scheduler.repository.MeetingRequestRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(originPatterns = "*") // Allow all for dev
public class MeetingController {

    private final MeetingRequestRepository meetingRequestRepository;
    private List<MeetingSlot> slots = new ArrayList<>();

    public MeetingController(MeetingRequestRepository meetingRequestRepository) {
        this.meetingRequestRepository = meetingRequestRepository;
        // Generate mock data similar to frontend
        generateSlots();
    }

    private void generateSlots() {
        LocalDateTime now = LocalDateTime.now();
        for (int i = 1; i <= 3; i++) {
            LocalDateTime day = now.plusDays(i).withHour(9).withMinute(0).withSecond(0).withNano(0);
            for (int j = 0; j < 5; j++) {
                LocalDateTime slotTime = day.plusHours(j * 2);
                slots.add(new MeetingSlot(
                        i + "-" + j,
                        slotTime.toString(), // Simplified ISO
                        Math.random() > 0.3
                ));
            }
        }
    }

    @GetMapping("/availability")
    public List<MeetingSlot> getAvailability() {
        return slots;
    }

    @PostMapping("/book")
    public Map<String, Object> bookSlot(@RequestBody Map<String, String> payload) {
        String slotId = payload.get("slotId");
        boolean success = false;
        String message = "Slot not found or already booked.";

        for (MeetingSlot slot : slots) {
            if (slot.getId().equals(slotId)) {
                if (slot.isAvailable()) {
                    slot.setAvailable(false);
                    success = true;
                    message = "Booking confirmed.";
                } else {
                    message = "Slot no longer available.";
                }
                break;
            }
        }

        return Map.of("success", success, "message", message);
    }

    @PostMapping("/schedule-request")
    public Map<String, Object> requestMeeting(@RequestBody Map<String, String> payload) {
        System.out.println("Received Schedule Request: " + payload);
        
        try {
            MeetingRequest request = new MeetingRequest(
                payload.get("name"),
                payload.get("email"),
                payload.get("topic")
            );
            meetingRequestRepository.save(request);
            return Map.of("success", true, "message", "Request saved to database");
        } catch (Exception e) {
            e.printStackTrace();
            return Map.of("success", false, "message", "Database error: " + e.getMessage());
        }
    }
}
