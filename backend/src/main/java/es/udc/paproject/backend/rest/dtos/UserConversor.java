package es.udc.paproject.backend.rest.dtos;

import es.udc.paproject.backend.model.entities.User;

import java.util.List;
import java.util.stream.Collectors;

public class UserConversor {
	
	private UserConversor() {}
	
	public final static UserDto toUserDto(User user) {
		return new UserDto(user.getId(), user.getUserName(), user.getFirstName(), user.getLastName(), user.getEmail(),
			user.getRole().toString());
	}
	public final static List<UserDto> toUserDtos(List<User> users) {
		return users.stream().map(UserConversor::toUserDto).collect(Collectors.toList());
	}
	public final static User toUser(UserDto userDto) {
		
		return new User(userDto.getUserName(), "amiga1234", userDto.getFirstName(), userDto.getLastName(),
			userDto.getEmail(), User.RoleType.valueOf(userDto.getRole()));
	}
	
	public final static AuthenticatedUserDto toAuthenticatedUserDto(String serviceToken, User user) {
		
		return new AuthenticatedUserDto(serviceToken, toUserDto(user));
		
	}

}
