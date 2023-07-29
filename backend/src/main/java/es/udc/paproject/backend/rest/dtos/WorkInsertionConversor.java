package es.udc.paproject.backend.rest.dtos;

import es.udc.paproject.backend.model.entities.Observation;
import es.udc.paproject.backend.model.entities.WorkInsertion;

import java.util.List;
import java.util.stream.Collectors;

public class WorkInsertionConversor {

    private WorkInsertionConversor() {}

    public static WorkInsertionDto toWorkInsertionDto(WorkInsertion workInsertion) {

        return new WorkInsertionDto(workInsertion);
    }

    public static List<WorkInsertionDto> toWorkInsertionDtos(List<WorkInsertion> workInsertions) {
        return workInsertions.stream().map(WorkInsertionConversor::toWorkInsertionDto).collect(Collectors.toList());
    }
}
