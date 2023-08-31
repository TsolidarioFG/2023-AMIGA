package es.udc.paproject.backend.model.services;

import es.udc.paproject.backend.model.daos.CollaborationDao;
import es.udc.paproject.backend.model.daos.VolunteerDao;
import es.udc.paproject.backend.model.entities.Collaboration;
import es.udc.paproject.backend.model.entities.Volunteer;
import es.udc.paproject.backend.rest.dtos.CollaborationDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
@Service
@Transactional
public class CollaborationServiceImpl implements CollaborationService {

    @Autowired
    private CollaborationDao collaborationDao;

    @Autowired
    private VolunteerDao volunteerDao;

    @Override
    public List<Collaboration> getByVolunteer(Long idVolunteer) {

        Volunteer volunteer = volunteerDao.findById(idVolunteer).orElse(null);

        if(volunteer == null)
            return null;

        return collaborationDao.findByVolunteer(volunteer);
   }

    @Override
    public Collaboration createCollaboration(CollaborationDto collaborationDto) {
        Collaboration collaboration = new Collaboration(collaborationDto);
        collaboration.setVolunteer(volunteerDao.findById(collaborationDto.getVolunteer()).orElse(null));
        return collaborationDao.save(collaboration);
    }

    @Override
    public Collaboration updateCollaboration(CollaborationDto collaborationDto) {
        Collaboration collaboration = collaborationDao.findById(collaborationDto.getId()).orElse(null);

        if(collaboration == null)
            return null;

        collaboration.setEndDate(collaborationDto.getEndDate());
        collaboration.setNumberHours(collaborationDto.getNumberHours());
        collaboration.setStartDate(collaborationDto.getStartDate());
        collaboration.setObservation(collaboration.getObservation());
        return collaborationDao.save(collaboration);
    }

    @Override
    public void deleteCollaboration(Long idCollaboration) {
        collaborationDao.deleteById(idCollaboration);
    }
}
