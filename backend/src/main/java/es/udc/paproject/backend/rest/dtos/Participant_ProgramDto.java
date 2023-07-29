package es.udc.paproject.backend.rest.dtos;

public class Participant_ProgramDto {

    private Long id;

    private Long program;

    private boolean itinerary;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getProgram() {
        return program;
    }

    public void setProgram(Long program) {
        this.program = program;
    }

    public boolean isItinerary() {
        return itinerary;
    }

    public void setItinerary(boolean itinerary) {
        this.itinerary = itinerary;
    }
}
