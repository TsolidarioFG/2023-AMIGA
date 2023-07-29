package es.udc.paproject.backend.model.services;

import es.udc.paproject.backend.model.daos.ObservationDao;
import es.udc.paproject.backend.model.daos.ParticipantDao;
import es.udc.paproject.backend.model.entities.Observation;
import es.udc.paproject.backend.model.entities.ObservationType;
import es.udc.paproject.backend.model.entities.Participant;
import es.udc.paproject.backend.rest.dtos.ObservationDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ObservationServiceImpl implements ObservationService{

    @Autowired
    private ObservationDao observationDao;

    @Autowired
    private ParticipantDao participantDao;

    @Override
    public Observation createObsevation(ObservationDto observationDto) {

        return observationDao.save(new Observation(observationDto.getDate(), observationDto.getTitle(), observationDto.getText(),
                participantDao.findById(observationDto.getParticipant()).orElse(null), ObservationType.valueOf(observationDto.getObservationType())));
    }

    @Override
    public Block<Observation> getObservations(Long idParticipant, int page, int size, LocalDate startDate, LocalDate endDate, List<String> observationTypes) {
        Participant participant = participantDao.findById(idParticipant).orElse(null);
        Slice<Observation> obervations = observationDao.findByParticipantOrderByDateDesc(participant, PageRequest.of(page, size));

        /*
        if(observationTypes.isEmpty() || observationTypes.size() == ObservationType.values().length) {
            //obervations = observationDao.findByParticipantOrderByDateDesc(participant, PageRequest.of(page, size));
        }else if( observationTypes.size() == 1){

        }
*/
        return new Block<>(obervations.getContent(), obervations.hasNext());
    }

    @Override
    public Observation updateObservation(ObservationDto observationDto) {
        Observation observation = observationDao.findById(observationDto.getId()).orElse(null);

        if(observation == null)
            return null;

        observation.setDate(observationDto.getDate());
        observation.setText(observationDto.getText());
        observation.setTitle(observationDto.getTitle());
        observation.setObservationType(ObservationType.valueOf(observationDto.getObservationType()));

        observationDao.save(observation);
        return observation;
    }

    @Override
    public void deleteObservation(Long idObservation) {
        observationDao.deleteById(idObservation);
    }

}
