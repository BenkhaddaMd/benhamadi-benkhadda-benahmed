package com.bezkoder.spring.security.postgresql.service;

import com.bezkoder.spring.security.postgresql.models.Address;
import com.bezkoder.spring.security.postgresql.models.Party;
import com.bezkoder.spring.security.postgresql.models.User;
import com.bezkoder.spring.security.postgresql.payload.request.PartyRequest;
import com.bezkoder.spring.security.postgresql.repository.AddressRepository;
import com.bezkoder.spring.security.postgresql.repository.PartyRepository;
import com.bezkoder.spring.security.postgresql.repository.UserRepository;
import jakarta.persistence.Id;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class PartyService {

    @Autowired
    private PartyRepository partyRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private UserRepository userRepository;

    public Party createParty(PartyRequest partyRequest, Long organizerId) {
        User organizer = userRepository.findById(organizerId)
                .orElseThrow(() -> new RuntimeException("Organizer not found"));

        Address address = new Address(
                partyRequest.getStreet(),
                partyRequest.getCity(),
                partyRequest.getPostalCode(),
                partyRequest.getCountry()
        );
        Address savedAddress = addressRepository.save(address);

        if (partyRequest.getIsPaid() && (partyRequest.getPrice() == null || partyRequest.getPrice().compareTo(BigDecimal.ZERO) <= 0)) {
            throw new IllegalArgumentException("Price must be greater than zero for paid parties.");
        }

        Party party = new Party();
        party.setAddress(savedAddress);
        party.setDateTime(partyRequest.getDateTime());
        party.setAvailablePlaces(partyRequest.getAvailablePlaces());
        party.setPaid(partyRequest.getIsPaid());
        party.setPrice(partyRequest.getIsPaid() ? partyRequest.getPrice() : BigDecimal.ZERO);
        party.setDescription(partyRequest.getDescription());
        party.setOrganizer(organizer);

        return partyRepository.save(party);
    }

    public List<Party> getAllParties() {
        return partyRepository.findAll();
    }

    public Optional<Party> getPartyById(int id) {
        return partyRepository.findById(id);
    }

    public Party updateParty(int id, PartyRequest partyRequest) {
        Party party = partyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Party not found"));

        Address address = new Address(
                partyRequest.getStreet(),
                partyRequest.getCity(),
                partyRequest.getPostalCode(),
                partyRequest.getCountry()
        );
        Address savedAddress = addressRepository.save(address);

        party.setAddress(savedAddress);
        party.setDateTime(partyRequest.getDateTime());
        party.setAvailablePlaces(partyRequest.getAvailablePlaces());
        party.setPaid(partyRequest.getIsPaid());
        party.setPrice(partyRequest.getIsPaid() ? partyRequest.getPrice() : BigDecimal.ZERO);
        party.setDescription(partyRequest.getDescription());

        return partyRepository.save(party);
    }

    public void deleteParty(int id) {
        if (!partyRepository.existsById(id)) {
            throw new RuntimeException("Party not found");
        }
        partyRepository.deleteById(id);
    }
}
