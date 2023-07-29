package es.udc.paproject.backend.model.entities;

import javax.persistence.*;

@Entity
@Table(name = "participant_program")
public class Participant_program {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "participant_id")
    private AnnualData annualData;

    @ManyToOne
    @JoinColumn(name = "exclusionFactor_id")
    private Program program;

    private boolean itinerary;


    public Participant_program(AnnualData annualData, Program program, boolean itinerary) {
        this.annualData = annualData;
        this.program = program;
        this.itinerary = itinerary;
    }

    public Participant_program() {

    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public AnnualData getAnnualData() {
        return annualData;
    }

    public void setAnnualData(AnnualData annualData) {
        this.annualData = annualData;
    }

    public Program getProgram() {
        return program;
    }

    public void setProgram(Program program) {
        this.program = program;
    }

    public boolean isItinerary() {
        return itinerary;
    }

    public void setItinerary(boolean itinerary) {
        this.itinerary = itinerary;
    }
}
