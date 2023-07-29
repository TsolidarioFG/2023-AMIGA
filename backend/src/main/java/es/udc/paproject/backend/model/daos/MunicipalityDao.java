package es.udc.paproject.backend.model.daos;

import es.udc.paproject.backend.model.entities.Municipality;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface MunicipalityDao extends PagingAndSortingRepository<Municipality, Long> {
}
