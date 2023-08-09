package es.udc.paproject.backend.model.daos;

import es.udc.paproject.backend.model.entities.Observation;
import es.udc.paproject.backend.model.entities.Participant;
import es.udc.paproject.backend.model.entities.WorkInsertion;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;

public interface WorkInsertionDao extends PagingAndSortingRepository<WorkInsertion, Long> {

    Slice<WorkInsertion> findByParticipantOrderByDateDesc(Participant participant, Pageable pageable);

    @Query("SELECT COUNT(w) FROM WorkInsertion w " +
            "WHERE w.participant = :participant " +
            "AND w.date BETWEEN :startDate AND :endDate")
    int countWorkInsertions(
            @Param("participant") Participant participant,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);
}
