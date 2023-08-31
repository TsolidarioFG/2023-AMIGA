package es.udc.paproject.backend.model.services;

import es.udc.paproject.backend.model.entities.Collaboration;
import es.udc.paproject.backend.rest.dtos.CollaborationDto;

import java.util.List;

public interface CollaborationService {

    List<Collaboration> getByVolunteer(Long idVolunteer);
    Collaboration createCollaboration(CollaborationDto collaboration);
    Collaboration updateCollaboration(CollaborationDto collaboration);
    void deleteCollaboration(Long idCollaboration);
}
