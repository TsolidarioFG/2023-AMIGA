package es.udc.paproject.backend.model.daos;

import es.udc.paproject.backend.model.entities.Language;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface LanguageDao extends PagingAndSortingRepository<Language, Long> {
}
