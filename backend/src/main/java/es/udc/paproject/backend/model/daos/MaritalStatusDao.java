package es.udc.paproject.backend.model.daos;

import es.udc.paproject.backend.model.entities.MaritalStatus;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface MaritalStatusDao extends PagingAndSortingRepository<MaritalStatus, Long> {
}
