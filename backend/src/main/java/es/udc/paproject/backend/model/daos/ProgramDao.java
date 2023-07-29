package es.udc.paproject.backend.model.daos;

import es.udc.paproject.backend.model.entities.Program;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface ProgramDao extends PagingAndSortingRepository<Program, Long> {
}
