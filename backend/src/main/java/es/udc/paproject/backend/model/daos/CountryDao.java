package es.udc.paproject.backend.model.daos;

import es.udc.paproject.backend.model.entities.Country;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface CountryDao extends PagingAndSortingRepository<Country, Long> {
}
