package es.udc.paproject.backend.model.services;

import es.udc.paproject.backend.model.entities.Observation;
import es.udc.paproject.backend.rest.dtos.ObservationDto;

import java.time.LocalDate;
import java.util.List;

public interface ObservationService {

    Observation createObsevation(ObservationDto observationDto);
    Block<Observation> getObservations(Long  idParticipant, int page, int size, LocalDate startDate, LocalDate endDate, List<String> observationTypes);
    Observation updateObservation(ObservationDto observationDto);
    void deleteObservation(Long idObservation);

}
