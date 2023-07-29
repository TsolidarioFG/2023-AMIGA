package es.udc.paproject.backend.model.mapper;

import es.udc.paproject.backend.model.entities.*;
import es.udc.paproject.backend.rest.dtos.KidDto;
import es.udc.paproject.backend.rest.dtos.ParticipantDto;
import es.udc.paproject.backend.rest.dtos.ParticipantSummaryDto;
import es.udc.paproject.backend.rest.dtos.Participant_ProgramDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Mapper(componentModel = "spring")
@Component
public interface ParticipantMapper {
    ParticipantSummaryDto toParticipantSummaryDto(Participant participant);

    List<ParticipantSummaryDto> toParticipantSummaryDtoList(List<Participant> participant);

    @Mapping(source = "p.gender", target = "sex", qualifiedByName = "toSex")
    @Mapping(source = "p.country.id", target = "country")
    @Mapping(source = "p.id", target = "idParticipant")
    @Mapping(source = "a.id", target = "idAnnualData")
    @Mapping(source = "a.nationalities", target = "nationalities", qualifiedByName = "toNationalities")
    @Mapping(source = "a.municipality.id", target = "municipality")
    @Mapping(source = "a.province.id", target = "province")
    @Mapping(source = "a.situation", target = "situation", qualifiedByName = "toSituation")
    @Mapping(source = "a.studies.id", target = "studies")
    @Mapping(source = "a.languages", target = "languages", qualifiedByName = "toLanguages")
    @Mapping(source = "a.cohabitation.id", target = "cohabitation")
    @Mapping(source = "a.maritalStatus.id", target = "maritalStatus")
    @Mapping(source = "a.housing.id", target = "housing")
    @Mapping(source = "a.exclusionFactors", target = "exclusionFactors", qualifiedByName = "toExclusionFactors")
    @Mapping(source = "a.approved", target = "approved", qualifiedByName = "toApproved")
    @Mapping(source = "a.disability", target = "disability", qualifiedByName = "toDisability")
    @Mapping(source = "a.employment.id", target = "employment")
    @Mapping(source = "a.benefit", target = "benefit", qualifiedByName = "toBenefit")
    @Mapping(source = "a.demand.id", target = "demand")
    ParticipantDto toParticipantDto(Participant p, AnnualData a);

    @Mapping(source = "gender", target = "sex", qualifiedByName = "toSex")
    KidDto toKidDto(Kid kid);

    List<KidDto> toKidDtoList(List<Kid> kid);

    @Mapping(source = "program.id", target = "program")
    Participant_ProgramDto toDto(Participant_program participantProgram);

    List<Participant_ProgramDto> toDto(List<Participant_program> participantProgram);

    @Named(value = "toSex")
    static String toSex (Gender gender){
        return gender.toString();
    }
    @Named(value = "toSituation")
    static String toSituation (AdministrativeSituation situation){
        return situation.toString();
    }
    @Named(value = "toBenefit")
    static String toBenefit (Benefit benefit){
        return benefit.toString();
    }
    @Named(value = "toDisability")
    static String toDisability (Disability disability){
        return disability.toString();
    }
    @Named(value = "toApproved")
    static String toApproved (Approved approved){

        if(approved == null)
            return "";

        return approved.toString();
    }
    @Named(value = "toNationalities")
    static List<Long> toNationalities (Set<Country> nationalities){
        List<Long> n = new ArrayList<>();
        for(Country country : nationalities) {
            n.add(country.getId());
        }
        return n;
    }
    @Named(value = "toLanguages")
    static List<Long> toLanguages (Set<Language> languages){
        List<Long> n = new ArrayList<>();
        for(Language language : languages) {
            n.add(language.getId());
        }
        return n;
    }
    @Named(value = "toExclusionFactors")
    static List<Long> toExclusionFactors (Set<ExclusionFactor> exclusionFactors){
        List<Long> n = new ArrayList<>();
        for(ExclusionFactor exclusionFactor : exclusionFactors) {
            n.add(exclusionFactor.getId());
        }
        return n;
    }

}
