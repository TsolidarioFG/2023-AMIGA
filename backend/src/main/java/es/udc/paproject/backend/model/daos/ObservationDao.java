package es.udc.paproject.backend.model.daos;

import es.udc.paproject.backend.model.entities.Observation;
import es.udc.paproject.backend.model.entities.ObservationType;
import es.udc.paproject.backend.model.entities.Participant;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface ObservationDao extends PagingAndSortingRepository<Observation, Long> {

    Slice<Observation> findByParticipantOrderByDateDesc(Participant participant, Pageable pageable);

    @Query("SELECT o FROM Observation o WHERE o.observationType IN :types " +
            "AND o.date >= :startDate AND o.date <= :endDate AND o.participant = :participant")
    Slice<Observation> findByTypeAndDate(@Param("types") List<ObservationType> types,
                                         @Param("startDate") LocalDate startDate,
                                         @Param("endDate") LocalDate endDate,
                                         @Param("participant") Participant participant, Pageable pageable);
}
