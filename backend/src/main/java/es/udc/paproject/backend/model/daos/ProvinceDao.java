package es.udc.paproject.backend.model.daos;

import es.udc.paproject.backend.model.entities.Province;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface ProvinceDao extends PagingAndSortingRepository<Province, Long> {
}
