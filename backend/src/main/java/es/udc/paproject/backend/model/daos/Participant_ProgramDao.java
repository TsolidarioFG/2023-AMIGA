package es.udc.paproject.backend.model.daos;

import es.udc.paproject.backend.model.entities.Participant_program;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface Participant_ProgramDao extends PagingAndSortingRepository<Participant_program, Long> {
}
