package es.udc.paproject.backend.model.services;

import es.udc.paproject.backend.model.exceptions.DuplicateInstanceException;
import es.udc.paproject.backend.model.exceptions.IncorrectLoginException;
import es.udc.paproject.backend.model.exceptions.IncorrectPasswordException;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.entities.User;
import org.springframework.web.bind.annotation.RequestAttribute;

import java.util.List;

public interface UserService {

	List<User> searchUsers(String keyword);

	void promoteUser( Long userId);

	void demoteUser( Long userId);
	
	void signUp(User user) throws DuplicateInstanceException;
	
	User login(String userName, String password) throws IncorrectLoginException;
	
	User loginFromId(Long id) throws InstanceNotFoundException;
	
	User updateProfile(Long id, String firstName, String lastName, String email) throws InstanceNotFoundException;
	
	void changePassword(Long id, String oldPassword, String newPassword)
		throws InstanceNotFoundException, IncorrectPasswordException;

	void deleteUser(Long idUser);

}
