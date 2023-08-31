package es.udc.paproject.backend.rest.controllers;

import es.udc.paproject.backend.model.entities.Collaboration;
import es.udc.paproject.backend.model.mapper.CollaborationMapper;
import es.udc.paproject.backend.model.services.CollaborationService;
import es.udc.paproject.backend.rest.dtos.CollaborationDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/collaboration")
public class CollaborationController {

    @Autowired
    private CollaborationService collaborationService;
    @Autowired
    private CollaborationMapper collaborationMapper;

    @GetMapping("/byVolunteer/{idVolunteer}")
    public ResponseEntity<List<CollaborationDto>> getByVolunteer(@PathVariable Long idVolunteer) {
        List<Collaboration> collaborations = collaborationService.getByVolunteer(idVolunteer);
        List<CollaborationDto> collaborationDtos = collaborations.stream()
                .map(collaborationMapper::toCollaborationDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(collaborationDtos);
    }

    @PostMapping
    public ResponseEntity<CollaborationDto> createCollaboration(@RequestBody CollaborationDto collaborationDto) {
        Collaboration createdCollaboration = collaborationService.createCollaboration(collaborationDto);
        return ResponseEntity.ok(collaborationMapper.toCollaborationDto(createdCollaboration));
    }

    @PutMapping
    public ResponseEntity<CollaborationDto> updateCollaboration(@RequestBody CollaborationDto collaborationDto) {
        Collaboration updatedCollaboration = collaborationService.updateCollaboration(collaborationDto);
        return ResponseEntity.ok(collaborationMapper.toCollaborationDto(updatedCollaboration));
    }

    @DeleteMapping("/{idCollaboration}")
    public ResponseEntity<Void> deleteCollaboration(@PathVariable Long idCollaboration) {
        collaborationService.deleteCollaboration(idCollaboration);
        return ResponseEntity.noContent().build();
    }
}
