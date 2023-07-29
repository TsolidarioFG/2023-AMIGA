package es.udc.paproject.backend.model.daos;

import es.udc.paproject.backend.model.entities.ExclusionFactor;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface ExclusionFactorDao extends PagingAndSortingRepository<ExclusionFactor, Long> {
}
