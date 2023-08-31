package es.udc.paproject.backend.model.services;

import es.udc.paproject.backend.model.entities.Volunteer;

import java.util.List;
import java.util.Optional;

public interface VolunteerService {

    List<Volunteer> searchVolunteer(String keyword, boolean active);
    Volunteer createVolunteer(Volunteer volunteer);
    Volunteer updateVolunteer(Volunteer volunteer);
    Optional<Volunteer> findVolunteer(Long id);

}
