package es.udc.paproject.backend.model.mapper;

import es.udc.paproject.backend.model.entities.Collaboration;
import es.udc.paproject.backend.rest.dtos.CollaborationDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper(componentModel = "spring")
@Component
public interface CollaborationMapper {

    @Mapping(source = "volunteer.id", target = "volunteer")
    CollaborationDto toCollaborationDto(Collaboration collaboration);

    List<CollaborationDto> toCollaborationDto(List<Collaboration> collaboration);
}
