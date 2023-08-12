package es.udc.paproject.backend.rest.dtos;

import java.time.LocalDate;
import java.util.List;

public class GetObservationParams {
    Long idParticipant;
    LocalDate startDate;
    LocalDate endDate;
    int page;
    List<String> types;

    public GetObservationParams() {
    }

    public Long getIdParticipant() {
        return idParticipant;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public int getPage() {
        return page;
    }

    public List<String> getTypes() {
        return types;
    }
}
