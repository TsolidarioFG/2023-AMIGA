package es.udc.paproject.backend.rest.dtos;

import es.udc.paproject.backend.model.entities.WorkInsertion;

import java.time.LocalDate;

public class WorkInsertionDto {

    private Long id;
    private LocalDate date;
    private Long contract;
    private String workField;
    private String workingDay;
    private Long participant;

    public WorkInsertionDto(WorkInsertion workInsertion) {
        this.id = workInsertion.getId();
        this.date =workInsertion.getDate();
        this.contract = workInsertion.getContract().getId();
        this.workField = workInsertion.getWorkField();
        this.workingDay = workInsertion.getWorkingDay().toString();
        this.participant = workInsertion.getParticipant().getId();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Long getContract() {
        return contract;
    }

    public void setContract(Long contract) {
        this.contract = contract;
    }

    public String getWorkField() {
        return workField;
    }

    public void setWorkField(String workField) {
        this.workField = workField;
    }

    public String getWorkingDay() {
        return workingDay;
    }

    public void setWorkingDay(String workingDay) {
        this.workingDay = workingDay;
    }

    public Long getParticipant() {
        return participant;
    }

    public void setParticipant(Long participant) {
        this.participant = participant;
    }
}
