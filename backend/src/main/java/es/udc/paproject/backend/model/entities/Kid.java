package es.udc.paproject.backend.model.entities;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
public class Kid {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate birthDate;
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @ManyToOne
    @JoinColumn(name = "participant_id")
    Participant participant;

    public Kid(LocalDate birthDate, Gender gender, Participant participant) {
        this.birthDate = birthDate;
        this.gender = gender;
        this.participant = participant;
    }

    public Kid() {

    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public Participant getParticipant() {
        return participant;
    }

    public void setParticipant(Participant participant) {
        this.participant = participant;
    }
}
