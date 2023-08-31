package es.udc.paproject.backend.rest.controllers;

import es.udc.paproject.backend.model.entities.Volunteer;
import es.udc.paproject.backend.model.mapper.VolunteerMapper;
import es.udc.paproject.backend.model.services.VolunteerService;
import es.udc.paproject.backend.rest.dtos.VolunteerDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/volunteer")
public class VolunteerController {

    @Autowired
    private VolunteerService volunteerService;

    @Autowired
    private VolunteerMapper volunteerMapper;

    @GetMapping("/search")
    public List<VolunteerDto> searchUsers(@RequestParam String keyword, @RequestParam boolean active) {
        List<Volunteer> volunteers = volunteerService.searchVolunteer(keyword, active);
        return volunteerMapper.toVolunteerDto(volunteers);
    }

    @GetMapping("/{id}")
    public ResponseEntity<VolunteerDto> findVolunteerById(@PathVariable Long id) {
        return volunteerService.findVolunteer(id).map(volunteer ->
                ResponseEntity.ok(volunteerMapper.toVolunteerDto(volunteer)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<VolunteerDto> createVolunteer(@RequestBody VolunteerDto volunteerDto) {
        Volunteer volunteer = volunteerMapper.toVolunteer(volunteerDto);
        Volunteer createdVolunteer = volunteerService.createVolunteer(volunteer);
        return ResponseEntity.ok(volunteerMapper.toVolunteerDto(createdVolunteer));
    }

    @PutMapping
    public ResponseEntity<VolunteerDto> updateVolunteer(@RequestBody VolunteerDto volunteerDto) {
        Volunteer volunteer = volunteerMapper.toVolunteer(volunteerDto);
        Volunteer updatedVolunteer = volunteerService.updateVolunteer(volunteer);
        return ResponseEntity.ok(volunteerMapper.toVolunteerDto(updatedVolunteer));
    }

}
