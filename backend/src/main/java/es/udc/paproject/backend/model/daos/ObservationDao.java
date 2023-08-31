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

    @Query("SELECT o FROM Observation o WHERE o.date >= COALESCE(:startDate, o.date) " +
            "AND o.date <= COALESCE(:endDate, o.date) AND o.participant = :participant " +
            "ORDER BY o.date DESC")
    Slice<Observation> findByDate(@Param("startDate") LocalDate startDate,
                                  @Param("endDate") LocalDate endDate,
                                  @Param("participant") Participant participant, Pageable pageable);

    @Query("SELECT o FROM Observation o WHERE o.observationType IN :types " +
            "AND o.date >= COALESCE(:startDate, o.date) AND o.date <= COALESCE(:endDate, o.date) " +
            "AND o.participant = :participant ORDER BY o.date DESC")
    Slice<Observation> findByTypeAndDate(@Param("types") List<ObservationType> types,
                                         @Param("startDate") LocalDate startDate,
                                         @Param("endDate") LocalDate endDate,
                                         @Param("participant") Participant participant, Pageable pageable);

    @Query("SELECT CASE WHEN COUNT(o) > 0 THEN TRUE ELSE FALSE END " +
            "FROM Observation o " +
            "WHERE o.participant = :participant " +
            "AND o.date BETWEEN :startDate AND :endDate")
    boolean existsObservationParticipant(
            @Param("participant") Participant participant,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);
}
