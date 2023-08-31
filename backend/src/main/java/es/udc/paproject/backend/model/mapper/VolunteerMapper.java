package es.udc.paproject.backend.model.mapper;

import es.udc.paproject.backend.model.entities.Volunteer;
import es.udc.paproject.backend.rest.dtos.VolunteerDto;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper(componentModel = "spring")
@Component
public interface VolunteerMapper {

    Volunteer toVolunteer(VolunteerDto volunteerDto);

    VolunteerDto toVolunteerDto(Volunteer volunteer);

    List<VolunteerDto> toVolunteerDto(List<Volunteer> volunteer);
}
