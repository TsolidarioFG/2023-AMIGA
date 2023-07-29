package es.udc.paproject.backend.model.daos;

import es.udc.paproject.backend.model.entities.Kid;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface KidDao extends PagingAndSortingRepository<Kid, Long> {
}
