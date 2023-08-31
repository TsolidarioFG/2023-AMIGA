package es.udc.paproject.backend.model.entities;

import es.udc.paproject.backend.rest.dtos.CollaborationDto;
import es.udc.paproject.backend.rest.dtos.VolunteerDto;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
public class Collaboration {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate startDate;
    private LocalDate endDate;
    private int numberHours;
    private String observation;
    @ManyToOne
    @JoinColumn(name = "volunteer_id")
    private Volunteer volunteer;

    public Collaboration() {
    }

    public Collaboration(CollaborationDto collaborationDto) {
        this.id = collaborationDto.getId();
        this.startDate = collaborationDto.getStartDate();
        this.endDate = collaborationDto.getEndDate();
        this.numberHours = collaborationDto.getNumberHours();
        this.observation = collaborationDto.getObservation();
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

    public Volunteer getVolunteer() {
        return volunteer;
    }

    public void setVolunteer(Volunteer volunteer) {
        this.volunteer = volunteer;
    }
}
