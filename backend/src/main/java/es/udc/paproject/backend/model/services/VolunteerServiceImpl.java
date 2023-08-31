package es.udc.paproject.backend.model.services;

import es.udc.paproject.backend.model.daos.VolunteerDao;
import es.udc.paproject.backend.model.entities.Volunteer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@Transactional
public class VolunteerServiceImpl implements VolunteerService {

    @Autowired
    private VolunteerDao volunteerDao;

    @Override
    public List<Volunteer> searchVolunteer(String keyword, boolean active) {


        if (keyword == null || keyword.trim().length() == 0) {
            if (active) {
                return volunteerDao.findActiveVolunteers();
            }

            return StreamSupport.stream(volunteerDao.findAll().spliterator(), false)
                    .collect(Collectors.toList());
        }
        String[] words = keyword.split(" ");

        if (words.length > 1) {
            List<Volunteer> result = new ArrayList<>();
            boolean isFirstElement = true;

            if (active) {
                for (String word : words) {
                    if (isFirstElement) {
                        isFirstElement = false;
                        result = volunteerDao.findActiveVolunteersByName(word);
                    }

                    result.retainAll(volunteerDao.findActiveVolunteersByName(word));
                }
            }

            for (String word : words) {
                if (isFirstElement) {
                    isFirstElement = false;
                    result = volunteerDao.findByFirstNameContainingOrLastNameContaining(word, word);
                }

                result.retainAll(volunteerDao.findByFirstNameContainingOrLastNameContaining(word, word));
            }

            return result;
        }


        if (active) {
            return volunteerDao.findActiveVolunteersByName(keyword);
        }
        return volunteerDao.findByFirstNameContainingOrLastNameContaining(keyword, keyword);
    }

    @Override
    public Volunteer createVolunteer(Volunteer volunteer) {
        return volunteerDao.save(volunteer);
    }

    @Override
    public Volunteer updateVolunteer(Volunteer volunteer) {
        return volunteerDao.save(volunteer);
    }

    @Override
    public Optional<Volunteer> findVolunteer(Long id) {
        return volunteerDao.findById(id);
    }


}
