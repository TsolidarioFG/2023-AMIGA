package es.udc.paproject.backend.model.daos;

import es.udc.paproject.backend.model.entities.Participant;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

public interface ParticipantDao extends PagingAndSortingRepository<Participant, Long> {

    Participant findByDni(String dni);

    Participant findByNie(String nie);

    Participant findByPas(String pas);
}
