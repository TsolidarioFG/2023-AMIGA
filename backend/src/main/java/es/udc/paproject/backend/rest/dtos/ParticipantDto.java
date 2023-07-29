package es.udc.paproject.backend.rest.dtos;

import es.udc.paproject.backend.model.entities.Participant_program;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;

public class ParticipantDto {
    private Long idParticipant;
    private String name;
    private String surnames;

    private LocalDate date;
    private List<Integer> yearList;
    private String dni;
    private String nie;
    private String pas;
    private String phone;
    private String email;
    private String sex;
    private LocalDate birthDate;
    private LocalDate datePi;
    private LocalDate interviewPi;
    @NotNull
    private List<KidDto> kids;
    private Long country;
    private Long idAnnualData;
    private boolean returned;
    @NotNull
    private List<Long> nationalities;
    private String address;
    private String postalAddress;
    @NotNull
    private Long municipality;
    @NotNull
    private Long province;
    private String situation;
    @NotNull
    private Long studies;
    @NotNull
    private Long maritalStatus;
    @NotNull
    private List<Long> languages;
    private String approved;
    private String demandedStudies;
    private boolean registered;
    private LocalDate dateRegister;
    private int numberRegistered;
    @NotNull
    private Long cohabitation;
    @NotNull
    private Long housing;
    @NotNull
    private List<Long> exclusionFactors;
    private String socialWorker;
    private String healthCoverage;
    private String disability;
    private boolean unemployedHousehold;
    private boolean oneAdultHousehold;
    private boolean dependants;
    @NotNull
    private Long employment;
    private String qualification;
    private String profExpOrigin;
    private String profExpSpain;
    private String skills;
    private String availableHours;
    private boolean drivingLicence;
    private boolean valid;
    private boolean vehicle;
    private boolean sepe;
    private int monthsSepe;
    private String benefit;
    private LocalDate dateBenefit;
    private String specialBenefit;
    @NotNull
    private Long demand;
    @NotNull
    private List<Participant_ProgramDto> programs;
    private String derivation;

    public Long getIdParticipant() {
        return idParticipant;
    }

    public void setIdParticipant(Long idParticipant) {
        this.idParticipant = idParticipant;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurnames() {
        return surnames;
    }

    public void setSurnames(String surnames) {
        this.surnames = surnames;
    }

    public String getDni() {
        return dni;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

    public String getNie() {
        return nie;
    }

    public void setNie(String nie) {
        this.nie = nie;
    }

    public String getPas() {
        return pas;
    }

    public void setPas(String pas) {
        this.pas = pas;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public LocalDate getDatePi() {
        return datePi;
    }

    public void setDatePi(LocalDate datePi) {
        this.datePi = datePi;
    }

    public LocalDate getInterviewPi() {
        return interviewPi;
    }

    public void setInterviewPi(LocalDate interviewPi) {
        this.interviewPi = interviewPi;
    }

    public List<KidDto> getKids() {
        return kids;
    }

    public void setKids(List<KidDto> kids) {
        this.kids = kids;
    }

    public Long getCountry() {
        return country;
    }

    public void setCountry(Long country) {
        this.country = country;
    }

    public Long getIdAnnualData() {
        return idAnnualData;
    }

    public void setIdAnnualData(Long idAnnualData) {
        this.idAnnualData = idAnnualData;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public boolean isReturned() {
        return returned;
    }

    public void setReturned(boolean returned) {
        this.returned = returned;
    }

    public List<Long> getNationalities() {
        return nationalities;
    }

    public void setNationalities(List<Long> nationalities) {
        this.nationalities = nationalities;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPostalAddress() {
        return postalAddress;
    }

    public void setPostalAddress(String postalAddress) {
        this.postalAddress = postalAddress;
    }

    public Long getMunicipality() {
        return municipality;
    }

    public void setMunicipality(Long municipality) {
        this.municipality = municipality;
    }

    public Long getProvince() {
        return province;
    }

    public void setProvince(Long province) {
        this.province = province;
    }

    public String getSituation() {
        return situation;
    }

    public void setSituation(String situation) {
        this.situation = situation;
    }

    public Long getStudies() {
        return studies;
    }

    public void setStudies(Long studies) {
        this.studies = studies;
    }

    public List<Long> getLanguages() {
        return languages;
    }

    public void setLanguages(List<Long> languages) {
        this.languages = languages;
    }

    public String getApproved() {
        return approved;
    }

    public void setApproved(String approved) {
        this.approved = approved;
    }

    public String getDemandedStudies() {
        return demandedStudies;
    }

    public void setDemandedStudies(String demandedStudies) {
        this.demandedStudies = demandedStudies;
    }

    public boolean isRegistered() {
        return registered;
    }

    public void setRegistered(boolean registered) {
        this.registered = registered;
    }

    public LocalDate getDateRegister() {
        return dateRegister;
    }

    public void setDateRegister(LocalDate dateRegister) {
        this.dateRegister = dateRegister;
    }

    public int getNumberRegistered() {
        return numberRegistered;
    }

    public void setNumberRegistered(int numberRegistered) {
        this.numberRegistered = numberRegistered;
    }

    public Long getCohabitation() {
        return cohabitation;
    }

    public void setCohabitation(Long cohabitation) {
        this.cohabitation = cohabitation;
    }

    public Long getHousing() {
        return housing;
    }

    public void setHousing(Long housing) {
        this.housing = housing;
    }

    public List<Long> getExclusionFactors() {
        return exclusionFactors;
    }

    public void setExclusionFactors(List<Long> exclusionFactors) {
        this.exclusionFactors = exclusionFactors;
    }

    public String getSocialWorker() {
        return socialWorker;
    }

    public void setSocialWorker(String socialWorker) {
        this.socialWorker = socialWorker;
    }

    public String getHealthCoverage() {
        return healthCoverage;
    }

    public void setHealthCoverage(String healthCoverage) {
        this.healthCoverage = healthCoverage;
    }

    public String getDisability() {
        return disability;
    }

    public void setDisability(String disability) {
        this.disability = disability;
    }

    public boolean isUnemployedHousehold() {
        return unemployedHousehold;
    }

    public void setUnemployedHousehold(boolean unemployedHousehold) {
        this.unemployedHousehold = unemployedHousehold;
    }

    public boolean isOneAdultHousehold() {
        return oneAdultHousehold;
    }

    public void setOneAdultHousehold(boolean oneAdultHousehold) {
        this.oneAdultHousehold = oneAdultHousehold;
    }

    public boolean isDependants() {
        return dependants;
    }

    public void setDependants(boolean dependants) {
        this.dependants = dependants;
    }

    public Long getEmployment() {
        return employment;
    }

    public void setEmployment(Long employment) {
        this.employment = employment;
    }

    public String getQualification() {
        return qualification;
    }

    public void setQualification(String qualification) {
        this.qualification = qualification;
    }

    public String getProfExpOrigin() {
        return profExpOrigin;
    }

    public void setProfExpOrigin(String profExpOrigin) {
        this.profExpOrigin = profExpOrigin;
    }

    public String getProfExpSpain() {
        return profExpSpain;
    }

    public void setProfExpSpain(String profExpSpain) {
        this.profExpSpain = profExpSpain;
    }

    public String getSkills() {
        return skills;
    }

    public void setSkills(String skills) {
        this.skills = skills;
    }

    public String getAvailableHours() {
        return availableHours;
    }

    public void setAvailableHours(String availableHours) {
        this.availableHours = availableHours;
    }

    public boolean isDrivingLicence() {
        return drivingLicence;
    }

    public void setDrivingLicence(boolean drivingLicence) {
        this.drivingLicence = drivingLicence;
    }

    public boolean isValid() {
        return valid;
    }

    public void setValid(boolean valid) {
        this.valid = valid;
    }

    public boolean isVehicle() {
        return vehicle;
    }

    public void setVehicle(boolean vehicle) {
        this.vehicle = vehicle;
    }

    public boolean isSepe() {
        return sepe;
    }

    public void setSepe(boolean sepe) {
        this.sepe = sepe;
    }

    public int getMonthsSepe() {
        return monthsSepe;
    }

    public void setMonthsSepe(int monthsSepe) {
        this.monthsSepe = monthsSepe;
    }

    public String getBenefit() {
        return benefit;
    }

    public void setBenefit(String benefit) {
        this.benefit = benefit;
    }

    public LocalDate getDateBenefit() {
        return dateBenefit;
    }

    public void setDateBenefit(LocalDate dateBenefit) {
        this.dateBenefit = dateBenefit;
    }

    public String getSpecialBenefit() {
        return specialBenefit;
    }

    public void setSpecialBenefit(String specialBenefit) {
        this.specialBenefit = specialBenefit;
    }

    public Long getDemand() {
        return demand;
    }

    public void setDemand(Long demand) {
        this.demand = demand;
    }

    public List<Participant_ProgramDto> getPrograms() {
        return programs;
    }

    public void setPrograms(List<Participant_ProgramDto> programs) {
        this.programs = programs;
    }

    public String getDerivation() {
        return derivation;
    }

    public void setDerivation(String derivation) {
        this.derivation = derivation;
    }

    public List<Integer> getYearList() {
        return yearList;
    }

    public void setYearList(List<Integer> yearList) {
        this.yearList = yearList;
    }

    public Long getMaritalStatus() {
        return maritalStatus;
    }

    public void setMaritalStatus(Long maritalStatus) {
        this.maritalStatus = maritalStatus;
    }
}
