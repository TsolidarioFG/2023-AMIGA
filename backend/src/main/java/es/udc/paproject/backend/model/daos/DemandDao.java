package es.udc.paproject.backend.model.daos;

import es.udc.paproject.backend.model.entities.Demand;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface DemandDao extends PagingAndSortingRepository<Demand, Long> {
}
