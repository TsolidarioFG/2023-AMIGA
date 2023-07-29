package es.udc.paproject.backend.model.daos;

import java.util.Optional;

import es.udc.paproject.backend.model.entities.User;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface UserDao extends PagingAndSortingRepository<User, Long> {
	
	boolean existsByUserName(String userName);

	Optional<User> findByUserName(String userName);
	
}
