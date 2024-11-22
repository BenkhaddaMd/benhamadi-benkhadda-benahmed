package com.bezkoder.spring.security.postgresql.service;

import com.bezkoder.spring.security.postgresql.models.Participant;
import com.bezkoder.spring.security.postgresql.models.ParticipantStatus;
import com.bezkoder.spring.security.postgresql.models.Party;
import com.bezkoder.spring.security.postgresql.models.User;
import com.bezkoder.spring.security.postgresql.payload.request.ParticipantRequest;
import com.bezkoder.spring.security.postgresql.repository.ParticipantRepository;
import com.bezkoder.spring.security.postgresql.repository.PartyRepository;
import com.bezkoder.spring.security.postgresql.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ParticipantService {

    @Autowired
    private ParticipantRepository participantRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PartyRepository partyRepository;

    public Participant createParticipant(ParticipantRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Party event = partyRepository.findById(request.getEventId())
                .orElseThrow(() -> new RuntimeException("Event not found"));

        Participant participant = new Participant();
        participant.setUser(user);
        participant.setEvent(event);
        participant.setStatus(ParticipantStatus.valueOf(request.getStatus().toUpperCase()));

        return participantRepository.save(participant);
    }

    public Participant updateParticipant(int id, ParticipantRequest request) {
        Participant participant = participantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Participant not found"));

        if (request.getStatus() != null) {
            participant.setStatus(ParticipantStatus.valueOf(request.getStatus().toUpperCase()));
        }

        return participantRepository.save(participant);
    }

    public List<Participant> getAllParticipants() {
        return participantRepository.findAll();
    }

    public Participant getParticipantById(int id) {
        return participantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Participant not found"));
    }

    public void deleteParticipant(int id) {
        participantRepository.deleteById(id);
    }
}
