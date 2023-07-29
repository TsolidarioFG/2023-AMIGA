package es.udc.paproject.backend.model.daos;

import es.udc.paproject.backend.model.entities.Observation;
import es.udc.paproject.backend.model.entities.Participant;
import es.udc.paproject.backend.model.entities.WorkInsertion;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface WorkInsertionDao extends PagingAndSortingRepository<WorkInsertion, Long> {

    Slice<WorkInsertion> findByParticipantOrderByDateDesc(Participant participant, Pageable pageable);
}
