package es.udc.paproject.backend.model.services;

import es.udc.paproject.backend.model.daos.*;
import es.udc.paproject.backend.model.entities.*;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.mapper.ParticipantMapper;
import es.udc.paproject.backend.rest.dtos.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.Period;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@Transactional
public class ParticipantServiceImpl implements ParticipantService {

    @Autowired
    private ParticipantDao participantDao;

    @Autowired
    private AnnualDataDao annualDataDao;

    @Autowired
    private KidDao kidDao;

    @Autowired
    private ObservationDao observationDao;

    @Autowired
    private WorkInsertionDao workInsertionDao;

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

        observationDao.save(new Observation(LocalDate.now(), "Primera acogida", participantDto.getObservation(), participant, ObservationType.GENERAL));

        return participantMapper.toParticipantDto(participantSaved, annualDataSaved);
    }

    @Override
    public ParticipantDto saveAnnualData(ParticipantDto participantDto) {
        Participant participant = participantDao.findById(participantDto.getIdParticipant()).orElse(null);
        AnnualData annualData = new AnnualData();
        annualData.setParticipant(participant);

        if (participant == null)
            return null;

        setParticipantData(participantDto, participant);
        setAnnualData(participantDto, annualData);
        participant.addYear(LocalDate.now().getYear());
        kidDao.deleteAll(participant.getKids());

        for (KidDto kidDto : participantDto.getKids()) {
            kidDao.save(new Kid(kidDto.getBirthDate(), Gender.valueOf(kidDto.getSex()), participant));
        }
        Participant participantUpdated = participantDao.save(participant);
        AnnualData annualDataSaved = annualDataDao.save(annualData);

        for (Participant_ProgramDto program : participantDto.getPrograms()) {
            participantProgramDao.save(new Participant_program(annualDataSaved, selectorService.getProgram(program.getProgram()), program.isItinerary()));
        }


        observationDao.save(new Observation(LocalDate.now(), "Acogida año " + LocalDate.now().getYear(),
                participantDto.getObservation(),
                participantUpdated, ObservationType.GENERAL));

        return participantMapper.toParticipantDto(participantUpdated, annualDataSaved);
    }

    @Override
    public ParticipantDto updateParticipant(ParticipantDto participantDto) {
        Participant participant = participantDao.findById(participantDto.getIdParticipant()).orElse(null);

        if (participant == null)
            return null;

        AnnualData annualData = annualDataDao.findById(participantDto.getIdAnnualData()).orElse(null);

        if (annualData == null)
            return null;


        setParticipantData(participantDto, participant);
        setAnnualData(participantDto, annualData);
        kidDao.deleteAll(participant.getKids());

        for (KidDto kidDto : participantDto.getKids()) {
            kidDao.save(new Kid(kidDto.getBirthDate(), Gender.valueOf(kidDto.getSex()), participant));
        }

        participantProgramDao.deleteAll(annualData.getPrograms());
        for (Participant_ProgramDto program : participantDto.getPrograms()) {
            participantProgramDao.save(new Participant_program(annualData, selectorService.getProgram(program.getProgram()), program.isItinerary()));
        }
        Participant participantUpdated = participantDao.save(participant);
        AnnualData annualDataUpdated = annualDataDao.save(annualData);

        observationDao.save(new Observation(LocalDate.now(), "Actualización datos personales",
                participantDto.getObservation(), participantUpdated, ObservationType.GENERAL));

        return participantMapper.toParticipantDto(participantUpdated, annualDataUpdated);
    }

    @Override
    public ExcelDto getExcelData(LocalDate startDate, LocalDate endDate) {

        List<Participant> participantList = participantDao.findByYearRange(startDate.getYear(), endDate.getYear());
        List<ParticipantExcelDto> excelDtoList = new ArrayList<>();
        ExcelDto excelDto = new ExcelDto();

        Map<String, Integer> exclusionFactorCountMen = new HashMap<>();
        Map<String, Integer> exclusionFactorCountWoman = new HashMap<>();
        Map<String, Integer> nationalitiesCountMen = new HashMap<>();
        Map<String, Integer> nationalitiesCountWoman = new HashMap<>();
        Map<String, Integer> contractsCountMen = new HashMap<>();
        Map<String, Integer> contractsCountWoman = new HashMap<>();
        Map<String, Integer> workTimeCountMen = new HashMap<>();
        Map<String, Integer> workTimeCountWoman = new HashMap<>();

        for (Participant participant : participantList) {
            if (observationDao.existsObservationParticipant(participant, startDate, endDate)) {

                int lastYearInRange = 0;
                for (int year : participant.getYearList()) {
                    if (year <= endDate.getYear() && year > lastYearInRange) {
                        lastYearInRange = year;
                    }
                }

                AnnualData annualData = annualDataDao.getAnnualData(participant.getId(), lastYearInRange);

                ParticipantExcelDto participantExcelDto = new ParticipantExcelDto(participant, annualData);
                participantExcelDto.setNumberInsertion(workInsertionDao.countWorkInsertions(participant, startDate, endDate));
                StringBuilder programs = new StringBuilder();
                boolean itinerary = false;

                for (Participant_program program : annualData.getPrograms()) {
                    programs.append(program.getProgram().getName());
                    programs.append("; ");
                    if (program.isItinerary())
                        itinerary = true;
                }
                participantExcelDto.setPrograms(programs.toString());
                participantExcelDto.setItinerary(itinerary);

                excelDtoList.add(participantExcelDto);

                generateStadistics(exclusionFactorCountMen, exclusionFactorCountWoman, nationalitiesCountMen,
                        nationalitiesCountWoman, participant, annualData);
            }
        }

        List<WorkInsertion> workInsertions = workInsertionDao.findByParticipants(participantList);

        for (WorkInsertion workInsertion : workInsertions) {
            getStatistics(contractsCountMen, contractsCountWoman, workInsertion.getParticipant(), workInsertion.getContract().getName());
            getStatistics(workTimeCountMen, workTimeCountWoman, workInsertion.getParticipant(), workInsertion.getWorkingDay().toString());
        }

        if (!excelDtoList.isEmpty()) {
            excelDto.setExclusionFactorCountMen(exclusionFactorCountMen);
            excelDto.setExclusionFactorCountWoman(exclusionFactorCountWoman);
            excelDto.setNationalitiesCountMen(nationalitiesCountMen);
            excelDto.setNationalitiesCountWoman(nationalitiesCountWoman);
            excelDto.setContractCountMen(contractsCountMen);
            excelDto.setContractCountWoman(contractsCountWoman);
            excelDto.setWorkTimeCountMen(workTimeCountMen);
            excelDto.setWorkTimeCountWoman(workTimeCountWoman);
            excelDto.setParticipantExcelDtoList(excelDtoList);
        }
        return excelDto;
    }

    @Override
    public StatisticsDto getStatistics(LocalDate startDate, LocalDate endDate) {
        List<Participant> participantList = participantDao.findByYearRange(startDate.getYear(), endDate.getYear());
        StatisticsDto statisticsDto = new StatisticsDto();

        Map<String, Integer> exclusionFactorCountMen = new HashMap<>();
        Map<String, Integer> exclusionFactorCountWoman = new HashMap<>();
        Map<String, Integer> nationalitiesCountMen = new HashMap<>();
        Map<String, Integer> nationalitiesCountWoman = new HashMap<>();
        Map<String, Integer> contractsCountMen = new HashMap<>();
        Map<String, Integer> contractsCountWoman = new HashMap<>();
        Map<String, Integer> workTimeCountMen = new HashMap<>();
        Map<String, Integer> workTimeCountWoman = new HashMap<>();

        Integer firstYearRangeMen = 0, secondYearRangeMen = 0, thirdYearRangeMen = 0, fourthYearRangeMen = 0;
        Integer firstYearRangeWoman = 0, secondYearRangeWoman = 0, thirdYearRangeWoman = 0, fourthYearRangeWoman = 0;
        LocalDate currentDate = LocalDate.now();
        for (Participant participant : participantList) {
            if (observationDao.existsObservationParticipant(participant, startDate, endDate)) {

                int lastYearInRange = 0;
                for (int year : participant.getYearList()) {
                    if (year <= endDate.getYear() && year > lastYearInRange) {
                        lastYearInRange = year;
                    }
                }
                Period period = Period.between(participant.getBirthDate(), currentDate);
                int year = period.getYears();

                if (participant.getGender() == Gender.H) {
                    statisticsDto.incrementNumberMen();

                    if (year <= 29) {
                        firstYearRangeMen++;
                    } else if (year <= 44) {
                        secondYearRangeMen++;
                    } else if (year <= 59) {
                        thirdYearRangeMen++;
                    } else {
                        fourthYearRangeMen++;
                    }

                } else if (participant.getGender() == Gender.M) {
                    statisticsDto.incrementNumberWoman();

                    if (year <= 29) {
                        firstYearRangeWoman++;
                    } else if (year <= 44) {
                        secondYearRangeWoman++;
                    } else if (year <= 59) {
                        thirdYearRangeWoman++;
                    } else {
                        fourthYearRangeWoman++;
                    }
                }

                AnnualData annualData = annualDataDao.getAnnualData(participant.getId(), lastYearInRange);

                generateStadistics(exclusionFactorCountMen, exclusionFactorCountWoman, nationalitiesCountMen,
                        nationalitiesCountWoman, participant, annualData);
            }
        }

        List<WorkInsertion> workInsertions = workInsertionDao.findByParticipants(participantList);

        for (WorkInsertion workInsertion : workInsertions) {
            getStatistics(contractsCountMen, contractsCountWoman, workInsertion.getParticipant(), workInsertion.getContract().getName());
            getStatistics(workTimeCountMen, workTimeCountWoman, workInsertion.getParticipant(), workInsertion.getWorkingDay().toString());
        }

        if (!participantList.isEmpty()) {
            statisticsDto.setExclusionFactorCountMen(exclusionFactorCountMen);
            statisticsDto.setExclusionFactorCountWoman(exclusionFactorCountWoman);
            statisticsDto.setNationalitiesCountMen(nationalitiesCountMen);
            statisticsDto.setNationalitiesCountWoman(nationalitiesCountWoman);
            statisticsDto.setContractCountMen(contractsCountMen);
            statisticsDto.setContractCountWoman(contractsCountWoman);
            statisticsDto.setWorkTimeCountMen(workTimeCountMen);
            statisticsDto.setWorkTimeCountWoman(workTimeCountWoman);
            statisticsDto.setYearsMen(Arrays.asList(firstYearRangeMen, secondYearRangeMen, thirdYearRangeMen, fourthYearRangeMen));
            statisticsDto.setYearsWoman(Arrays.asList(firstYearRangeWoman, secondYearRangeWoman, thirdYearRangeWoman, fourthYearRangeWoman));
        }
        return statisticsDto;
    }

    private void generateStadistics(Map<String, Integer> exclusionFactorCountMen,
                                    Map<String, Integer> exclusionFactorCountWoman,
                                    Map<String, Integer> nationalitiesCountMen,
                                    Map<String, Integer> nationalitiesCountWoman,
                                    Participant participant, AnnualData annualData) {

        Set<ExclusionFactor> exclusionFactors = annualData.getExclusionFactors();

        for (ExclusionFactor exclusionFactor : exclusionFactors) {
            getStatistics(exclusionFactorCountMen, exclusionFactorCountWoman, participant, exclusionFactor.getName());
        }

        Set<Country> nationalities = annualData.getNationalities();

        for (Country nationality : nationalities) {
            getStatistics(nationalitiesCountMen, nationalitiesCountWoman, participant, nationality.getName());
        }
    }

    private void getStatistics(Map<String, Integer> mapCountMen, Map<String, Integer> mapCountWoman,
                               Participant participant, String name) {
        if (participant.getGender() == Gender.H) {
            mapCountMen.put(name, mapCountMen.getOrDefault(name, 0) + 1);
        } else if (participant.getGender() == Gender.M) {
            mapCountWoman.put(name, mapCountWoman.getOrDefault(name, 0) + 1);
        }
    }

    private boolean isPresentProgram(List<Participant_ProgramDto> list, Long id) {
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
