package es.udc.paproject.backend.model.daos;

import es.udc.paproject.backend.model.entities.Volunteer;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VolunteerDao extends PagingAndSortingRepository<Volunteer, Long> {

    List<Volunteer> findByFirstNameContainingOrLastNameContaining(String firstname, String lastname);

    @Query("SELECT DISTINCT c.volunteer FROM Collaboration c JOIN c.volunteer v " +
            "WHERE (v.firstName LIKE :keyword OR v.lastName LIKE :keyword) " +
            "AND c.endDate IS NULL OR c.endDate > CURRENT_TIMESTAMP")
    List<Volunteer> findActiveVolunteersByName(@Param("keyword") String keyword);

    @Query(" SELECT DISTINCT c.volunteer FROM Collaboration c JOIN c.volunteer v " +
            "WHERE c.endDate IS NULL OR c.endDate > CURRENT_TIMESTAMP")
    List<Volunteer> findActiveVolunteers();

}
