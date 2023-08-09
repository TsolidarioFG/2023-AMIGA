package es.udc.paproject.backend.model.daos;

import es.udc.paproject.backend.model.entities.Participant;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface ParticipantDao extends PagingAndSortingRepository<Participant, Long> {

    Participant findByDni(String dni);

    Participant findByNie(String nie);

    Participant findByPas(String pas);

    @Query("SELECT DISTINCT p FROM Participant p JOIN p.yearList y " +
            "WHERE y BETWEEN :startYear AND :endYear")
    List<Participant> findByYearRange(int startYear, int endYear);
}
