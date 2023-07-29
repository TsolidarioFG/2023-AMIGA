package es.udc.paproject.backend.rest.dtos;

import es.udc.paproject.backend.model.entities.Observation;

import java.util.List;
import java.util.stream.Collectors;

public class ObservationConversor {
    private ObservationConversor() {}

    public static ObservationDto toObservationDto(Observation observation) {

        return new ObservationDto(observation);
    }

    public static List<ObservationDto> toObservationDtos(List<Observation> observations) {
        return observations.stream().map(ObservationConversor::toObservationDto).collect(Collectors.toList());
    }
}
