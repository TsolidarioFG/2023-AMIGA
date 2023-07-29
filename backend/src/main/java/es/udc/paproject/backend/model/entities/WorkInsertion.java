package es.udc.paproject.backend.model.entities;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
public class WorkInsertion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;
    @ManyToOne
    @JoinColumn(name = "contract_id")
    private Contract contract;
    private String workField;

    @Enumerated(EnumType.STRING)
    private WorkingDay workingDay;
    @ManyToOne
    @JoinColumn(name = "participant_id")
    private Participant participant;

    public WorkInsertion(LocalDate date, Contract contract, String workField, WorkingDay workingDay, Participant participant) {
        this.date = date;
        this.contract = contract;
        this.workField = workField;
        this.workingDay = workingDay;
        this.participant = participant;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Contract getContract() {
        return contract;
    }

    public void setContract(Contract contract) {
        this.contract = contract;
    }

    public String getWorkField() {
        return workField;
    }

    public void setWorkField(String type) {
        this.workField = type;
    }

    public Participant getParticipant() {
        return participant;
    }

    public void setParticipant(Participant participant) {
        this.participant = participant;
    }

    public WorkingDay getWorkingDay() {
        return workingDay;
    }

    public void setWorkingDay(WorkingDay workingDay) {
        this.workingDay = workingDay;
    }
}
