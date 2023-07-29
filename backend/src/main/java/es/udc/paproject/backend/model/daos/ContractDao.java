package es.udc.paproject.backend.model.daos;

import es.udc.paproject.backend.model.entities.Contract;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface ContractDao extends PagingAndSortingRepository<Contract, Long> {
}
