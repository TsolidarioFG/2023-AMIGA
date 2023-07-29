package es.udc.paproject.backend.model.daos;

import es.udc.paproject.backend.model.entities.AnnualData;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

public interface AnnualDataDao extends PagingAndSortingRepository<AnnualData, Long> {
    @Query("SELECT a from AnnualData a where a.participant.id = :idParticipant and YEAR(a.date) = :year")
    AnnualData getAnnualData(@Param("idParticipant") Long idParticipant, @Param("year") int year);
}
