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
import java.util.ArrayList;
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
    public Block<Observation> getObservations(Long idParticipant, int page, int size, LocalDate startDate,
                                              LocalDate endDate, List<String> observationTypes) {
        Participant participant = participantDao.findById(idParticipant).orElse(null);

        Slice<Observation> observations;

        if(observationTypes == null || observationTypes.isEmpty() || observationTypes.size() == ObservationType.values().length) {
            observations = observationDao.findByDate(startDate, endDate, participant, PageRequest.of(page, size));
        } else {
            List<ObservationType> observationTypeList = new ArrayList<>();
            for( String type: observationTypes) {
                observationTypeList.add(ObservationType.valueOf(type));
            }

            observations = observationDao.findByTypeAndDate(observationTypeList,
                    startDate, endDate, participant, PageRequest.of(page, size));
        }

        return new Block<>(observations.getContent(), observations.hasNext());
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
