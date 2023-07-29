package es.udc.paproject.backend.model.entities;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
public class Observation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;

    private String title;

    private String text;
    @Enumerated(EnumType.STRING)
    private ObservationType observationType;

    public Observation(LocalDate date, String title, String text, Participant participant, ObservationType observationType) {
        this.date = date;
        this.title = title;
        this.text = text;
        this.participant = participant;
        this.observationType = observationType;
    }

    @ManyToOne
    @JoinColumn(name = "participant_id")
    private Participant participant;

    public Observation() {

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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Participant getParticipant() {
        return participant;
    }

    public void setParticipant(Participant participant) {
        this.participant = participant;
    }

    public ObservationType getObservationType() {
        return observationType;
    }

    public void setObservationType(ObservationType observationType) {
        this.observationType = observationType;
    }
}
