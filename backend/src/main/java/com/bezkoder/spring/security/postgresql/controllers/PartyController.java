package com.bezkoder.spring.security.postgresql.controllers;

import com.bezkoder.spring.security.postgresql.models.Party;
import com.bezkoder.spring.security.postgresql.payload.request.PartyRequest;
import com.bezkoder.spring.security.postgresql.service.PartyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/parties")
public class PartyController {

    @Autowired
    private PartyService partyService;

    @PostMapping("/{organizerId}")
    public ResponseEntity<Party> createParty(@PathVariable Long organizerId, @RequestBody PartyRequest partyRequest) {
        Party party = partyService.createParty(partyRequest, organizerId);
        return ResponseEntity.ok(party);
    }

    @GetMapping
    public ResponseEntity<List<Party>> getAllParties() {
        return ResponseEntity.ok(partyService.getAllParties());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Party> getPartyById(@PathVariable int id) {
        return partyService.getPartyById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Party> updateParty(@PathVariable int id, @RequestBody PartyRequest partyRequest) {
        Party party = partyService.updateParty(id, partyRequest);
        return ResponseEntity.ok(party);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteParty(@PathVariable int id) {
        partyService.deleteParty(id);
        return ResponseEntity.ok("Party deleted successfully");
    }
}
