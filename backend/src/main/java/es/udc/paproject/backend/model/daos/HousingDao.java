package es.udc.paproject.backend.model.daos;

import es.udc.paproject.backend.model.entities.Housing;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface HousingDao extends PagingAndSortingRepository<Housing, Long> {
}
