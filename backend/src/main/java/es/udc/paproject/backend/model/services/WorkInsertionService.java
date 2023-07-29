package es.udc.paproject.backend.model.services;

import es.udc.paproject.backend.model.entities.WorkInsertion;
import es.udc.paproject.backend.rest.dtos.WorkInsertionDto;

public interface WorkInsertionService {

    WorkInsertion createWorkInsertion(WorkInsertionDto workInsertionDto);
    Block<WorkInsertion> getWorkInsertions(Long idParticipant, int page, int size);
    WorkInsertion updateWorkInsertion(WorkInsertionDto workInsertionDto);
    void deleteWorkInsertion(Long idWorkInsertion);

}
