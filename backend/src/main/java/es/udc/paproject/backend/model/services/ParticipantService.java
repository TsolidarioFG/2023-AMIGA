package es.udc.paproject.backend.model.services;

import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.rest.dtos.ParticipantDto;
import es.udc.paproject.backend.rest.dtos.ParticipantSummaryDto;

import java.util.List;
import java.util.Optional;

public interface ParticipantService {

    List<ParticipantSummaryDto> getParcipants();

    Optional<ParticipantDto> getParcipipant(Long idParticipant, int year);

    ParticipantSummaryDto getParcitipantByDocumentation(String type, String doc) throws InstanceNotFoundException;

    ParticipantDto saveParticipant(ParticipantDto participantDto);

    ParticipantDto saveAnnualData(ParticipantDto participantDto);

    ParticipantDto updateParticipant(ParticipantDto participantDto);
}
