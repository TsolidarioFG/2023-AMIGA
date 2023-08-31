package es.udc.paproject.backend.model.mapper;

import es.udc.paproject.backend.model.entities.Gender;
import es.udc.paproject.backend.model.entities.Kid;
import es.udc.paproject.backend.rest.dtos.KidDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper(componentModel = "spring")
@Component
public interface KidMapper {

    @Mapping(source = "gender", target = "sex", qualifiedByName = "toSex")
    KidDto toKidDto(Kid kid);

    List<KidDto> toKidDtoList(List<Kid> kid);

    @Mapping(source = "sex", target = "gender", qualifiedByName = "toGender")
    Kid dtoToEntity(KidDto dto);

    List<Kid> dtosToEntity(List<KidDto> kid);
    @Named(value = "toSex")
    static String toSex (Gender gender){
        return gender.toString();
    }

    @Named(value = "toGender")
    static Gender toGender (String gender){
        return Gender.valueOf(gender);
    }
}
