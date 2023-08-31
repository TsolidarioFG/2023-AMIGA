package es.udc.paproject.backend.rest.dtos;

import java.time.LocalDate;

public class CollaborationDto {

    private Long id;
    private LocalDate startDate;
    private LocalDate endDate;
    private int numberHours;
    private String observation;
    private Long volunteer;

    public CollaborationDto() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public int getNumberHours() {
        return numberHours;
    }

    public void setNumberHours(int numberHours) {
        this.numberHours = numberHours;
    }

    public String getObservation() {
        return observation;
    }

    public void setObservation(String observation) {
        this.observation = observation;
    }

    public Long getVolunteer() {
        return volunteer;
    }

    public void setVolunteer(Long volunteer) {
        this.volunteer = volunteer;
    }
}
