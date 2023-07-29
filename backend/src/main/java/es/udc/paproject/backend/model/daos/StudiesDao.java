package es.udc.paproject.backend.model.daos;

import es.udc.paproject.backend.model.entities.Studies;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface StudiesDao extends PagingAndSortingRepository<Studies, Long> {
}
