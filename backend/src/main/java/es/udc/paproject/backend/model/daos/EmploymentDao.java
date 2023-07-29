package es.udc.paproject.backend.model.daos;

import es.udc.paproject.backend.model.entities.Employment;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface EmploymentDao extends PagingAndSortingRepository<Employment, Long> {
}
