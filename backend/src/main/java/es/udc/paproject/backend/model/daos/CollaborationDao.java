package es.udc.paproject.backend.model.daos;

import es.udc.paproject.backend.model.entities.Collaboration;
import es.udc.paproject.backend.model.entities.Volunteer;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface CollaborationDao extends PagingAndSortingRepository<Collaboration, Long> {

    List<Collaboration> findByVolunteer(Volunteer volunteer);
}
