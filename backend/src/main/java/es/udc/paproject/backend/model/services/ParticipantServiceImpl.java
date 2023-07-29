package es.udc.paproject.backend.model.services;

import es.udc.paproject.backend.model.daos.AnnualDataDao;
import es.udc.paproject.backend.model.daos.KidDao;
import es.udc.paproject.backend.model.daos.ParticipantDao;
import es.udc.paproject.backend.model.daos.Participant_ProgramDao;
import es.udc.paproject.backend.model.entities.*;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.mapper.ParticipantMapper;
import es.udc.paproject.backend.rest.dtos.KidDto;
import es.udc.paproject.backend.rest.dtos.ParticipantDto;
import es.udc.paproject.backend.rest.dtos.ParticipantSummaryDto;
import es.udc.paproject.backend.rest.dtos.Participant_ProgramDto;
import jxl.write.WritableWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class ParticipantServiceImpl implements ParticipantService {

    @Autowired
    private ParticipantDao participantDao;

    @Autowired
    private AnnualDataDao annualDataDao;

    @Autowired
    private KidDao kidDao;

    @Autowired
    private SelectorServiceImpl selectorService;

    @Autowired
    private ParticipantMapper participantMapper;

    @Autowired
    private Participant_ProgramDao participantProgramDao;

    @Override
    public List<ParticipantSummaryDto> getParcipants() {
        return participantMapper.toParticipantSummaryDtoList(
                StreamSupport.stream(participantDao.findAll().spliterator(), false)
                        .collect(Collectors.toList()));
    }

    @Override
    public Optional<ParticipantDto> getParcipipant(Long idParticipant, int year) {
        return participantDao.findById(idParticipant).map(participant -> {
            AnnualData data = annualDataDao.getAnnualData(idParticipant, year);
            return participantMapper.toParticipantDto(participant, data);
        });
    }

    @Override
    public ParticipantSummaryDto getParcitipantByDocumentation(String type, String doc) throws InstanceNotFoundException {
        Participant participant;

        if (Objects.equals(type, "dni")) {
            participant = participantDao.findByDni(doc);
        } else if (Objects.equals(type, "nie")) {
            participant = participantDao.findByNie(doc);
        } else {
            participant = participantDao.findByPas(doc);
        }
        if (participant == null)
            throw new InstanceNotFoundException("el participante no existe", doc);
        return participantMapper.toParticipantSummaryDto(participant);
    }

    @Override
    public ParticipantDto saveParticipant(ParticipantDto participantDto) {
        Participant participant = new Participant();
        setParticipantData(participantDto, participant);
        Participant participantSaved = participantDao.save(participant);
        participantSaved.addYear(LocalDate.now().getYear());
        for (KidDto kidDto : participantDto.getKids()) {
            kidDao.save(new Kid(kidDto.getBirthDate(), Gender.valueOf(kidDto.getSex()), participantSaved));
        }

        AnnualData annualData = new AnnualData();
        annualData.setParticipant(participantSaved);
        setAnnualData(participantDto, annualData);
        AnnualData annualDataSaved = annualDataDao.save(annualData);

        for (Participant_ProgramDto program : participantDto.getPrograms()) {
            participantProgramDao.save(new Participant_program(annualDataSaved, selectorService.getProgram(program.getProgram()), program.isItinerary()));
        }

        return participantMapper.toParticipantDto(participantSaved, annualDataSaved);
    }

    @Override
    public ParticipantDto saveAnnualData(ParticipantDto participantDto) {
        Participant participant = participantDao.findById(participantDto.getIdParticipant()).orElse(null);

        if (participant == null)
            return null;

        setParticipantData(participantDto, participant);
        for (KidDto kidDto : participantDto.getKids()) {
            if (kidDto.getId() == null)
                kidDao.save(new Kid(kidDto.getBirthDate(), Gender.valueOf(kidDto.getSex()), participant));
        }
        participant.addYear(LocalDate.now().getYear());

        AnnualData annualData = new AnnualData();
        annualData.setParticipant(participant);
        setAnnualData(participantDto, annualData);

        for (Participant_ProgramDto program : participantDto.getPrograms()) {
            participantProgramDao.save(new Participant_program(annualData, selectorService.getProgram(program.getProgram()), program.isItinerary()));
        }

        participantDao.save(participant);
        annualDataDao.save(annualData);
        return participantMapper.toParticipantDto(participant, annualDataDao.save(annualData));
    }

    @Override
    public ParticipantDto updateParticipant(ParticipantDto participantDto) {
        Participant participant = participantDao.findById(participantDto.getIdParticipant()).orElse(null);

        if (participant == null)
            return null;

        AnnualData annualData = annualDataDao.findById(participantDto.getIdAnnualData()).orElse(null);

        if (annualData == null)
            return null;

        for (KidDto kidDto : participantDto.getKids()) {
            if (kidDto.getId() == null)
                kidDao.save(new Kid(kidDto.getBirthDate(), Gender.valueOf(kidDto.getSex()), participant));
        }

        Set<Participant_program> participantProgramList = annualData.getPrograms();

        for (Participant_program program : participantProgramList) {
            if(!isPresent(participantDto.getPrograms(), program.getId())){
                participantProgramDao.deleteById(program.getId());
            }
        }

        for (Participant_ProgramDto program : participantDto.getPrograms()) {
            if (program.getId() == null)
                participantProgramDao.save(new Participant_program(annualData, selectorService.getProgram(program.getProgram()), program.isItinerary()));
        }

        setParticipantData(participantDto, participant);
        annualData.setParticipant(participant);
        setAnnualData(participantDto, annualData);

        participantDao.save(participant);
        annualDataDao.save(annualData);
        return participantMapper.toParticipantDto(participant, annualData);
    }

    @Override
    public WritableWorkbook getExcel(LocalDate startDate, LocalDate endDate) {
        return null;
    }

    private boolean isPresent(List<Participant_ProgramDto> list, Long id) {
        for (Participant_ProgramDto item : list) {
            if (Objects.equals(item.getId(), id)) {
                return true;
            }
        }
        return false;
    }

    private void setAnnualData(ParticipantDto participantDto, AnnualData annualData) {
        annualData.setDate(LocalDate.now());
        annualData.setReturned(participantDto.isReturned());
        for (Long nat : participantDto.getNationalities()) {
            annualData.getNationalities().add(selectorService.getCountry(nat));
        }
        annualData.setAddress(participantDto.getAddress());
        annualData.setPostalAddress(participantDto.getPostalAddress());
        annualData.setMunicipality(selectorService.getMunicipality(participantDto.getMunicipality()));
        annualData.setProvince(selectorService.getProvince(participantDto.getProvince()));
        annualData.setSituation(AdministrativeSituation.valueOf(participantDto.getSituation()));
        annualData.setStudies(selectorService.getStudies(participantDto.getStudies()));
        for (Long lan : participantDto.getLanguages()) {
            annualData.getLanguages().add(selectorService.getLanguage(lan));
        }
        if (!Objects.equals(participantDto.getApproved(), ""))
            annualData.setApproved(Approved.valueOf(participantDto.getApproved()));
        annualData.setDemandedStudies(participantDto.getDemandedStudies());
        annualData.setRegistered(participantDto.isRegistered());
        annualData.setDateRegister(participantDto.getDateRegister());
        annualData.setNumberRegistered(participantDto.getNumberRegistered());
        annualData.setCohabitation(selectorService.getCohabitation(participantDto.getCohabitation()));
        annualData.setMaritalStatus(selectorService.getMaritalStatus(participantDto.getMaritalStatus()));
        annualData.setHousing(selectorService.getHousing(participantDto.getHousing()));
        for (Long fact : participantDto.getExclusionFactors()) {
            annualData.getExclusionFactors().add(selectorService.getExclusionFactor(fact));
        }
        annualData.setSocialWorker(participantDto.getSocialWorker());
        annualData.setHealthCoverage(participantDto.getHealthCoverage());
        annualData.setDisability(Disability.valueOf(participantDto.getDisability()));
        annualData.setUnemployedHousehold(participantDto.isUnemployedHousehold());
        annualData.setOneAdultHousehold(participantDto.isOneAdultHousehold());
        annualData.setDependants(participantDto.isDependants());
        annualData.setEmployment(selectorService.getEmployment(participantDto.getEmployment()));
        annualData.setQualification(participantDto.getQualification());
        annualData.setProfExpOrigin(participantDto.getProfExpOrigin());
        annualData.setProfExpSpain(participantDto.getProfExpSpain());
        annualData.setSkills(participantDto.getSkills());
        annualData.setAvailableHours(participantDto.getAvailableHours());
        annualData.setDrivingLicence(participantDto.isDrivingLicence());
        annualData.setValid(participantDto.isValid());
        annualData.setVehicle(participantDto.isVehicle());
        annualData.setSepe(participantDto.isSepe());
        annualData.setMonthsSepe(participantDto.getMonthsSepe());
        annualData.setBenefit(Benefit.valueOf(participantDto.getBenefit()));
        annualData.setDateBenefit(participantDto.getDateBenefit());
        annualData.setSpecialBenefit(participantDto.getSpecialBenefit());
        annualData.setDemand(selectorService.getDemand(participantDto.getDemand()));
        annualData.setDerivation(participantDto.getDerivation());
    }

    private void setParticipantData(ParticipantDto participantDto, Participant participant) {
        participant.setName(participantDto.getName());
        participant.setSurnames(participantDto.getSurnames());
        participant.setDni(participantDto.getDni());
        participant.setNie(participantDto.getNie());
        participant.setPas(participantDto.getPas());
        participant.setPhone(participantDto.getPhone());
        participant.setEmail(participantDto.getEmail());
        participant.setGender(Gender.valueOf(participantDto.getSex()));
        participant.setBirthDate(participantDto.getBirthDate());
        participant.setDatePi(participantDto.getDatePi());
        participant.setInterviewPi(participantDto.getInterviewPi());
        participant.setCountry(selectorService.getCountry(participantDto.getCountry()));

    }
}
