package es.udc.paproject.backend.model.daos;

import es.udc.paproject.backend.model.entities.Cohabitation;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface CohabitationDao extends PagingAndSortingRepository<Cohabitation, Long> {
}
