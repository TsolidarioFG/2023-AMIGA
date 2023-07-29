package es.udc.paproject.backend.model.services;

import es.udc.paproject.backend.model.daos.ParticipantDao;
import es.udc.paproject.backend.model.daos.WorkInsertionDao;
import es.udc.paproject.backend.model.entities.Participant;
import es.udc.paproject.backend.model.entities.WorkInsertion;
import es.udc.paproject.backend.model.entities.WorkingDay;
import es.udc.paproject.backend.rest.dtos.WorkInsertionDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

@Service
public class WorkInsertionServiceImpl implements WorkInsertionService{


    @Autowired
    private WorkInsertionDao workInsertionDao;

    @Autowired
    private SelectorServiceImpl selectorService;

    @Autowired
    private ParticipantDao participantDao;

    @Override
    public WorkInsertion createWorkInsertion(WorkInsertionDto workInsertionDto) {
        return workInsertionDao.save(new WorkInsertion( workInsertionDto.getDate(), selectorService.getContract(workInsertionDto.getContract()),
                workInsertionDto.getWorkField(), WorkingDay.valueOf(workInsertionDto.getWorkingDay()),
                participantDao.findById(workInsertionDto.getParticipant()).orElse(null)));
    }

    @Override
    public Block<WorkInsertion> getWorkInsertions(Long idParticipant, int page, int size) {
        Participant participant = participantDao.findById(idParticipant).orElse(null);

        Slice<WorkInsertion> workInsertions = workInsertionDao.findByParticipantOrderByDateDesc(participant, PageRequest.of(page, size));
        return new Block<>(workInsertions.getContent(), workInsertions.hasNext());
    }

    @Override
    public WorkInsertion updateWorkInsertion(WorkInsertionDto workInsertionDto) {
        WorkInsertion workInsertion = workInsertionDao.findById(workInsertionDto.getId()).orElse(null);

        if(workInsertion == null)
            return null;

        workInsertion.setDate(workInsertionDto.getDate());
        workInsertion.setContract(selectorService.getContract(workInsertionDto.getContract()));
        workInsertion.setWorkField(workInsertionDto.getWorkField());
        workInsertion.setWorkingDay(WorkingDay.valueOf(workInsertionDto.getWorkingDay()));

        workInsertionDao.save(workInsertion);
        return workInsertion;
    }

    @Override
    public void deleteWorkInsertion(Long idWorkInsertion) {
        workInsertionDao.deleteById(idWorkInsertion);
    }
}
