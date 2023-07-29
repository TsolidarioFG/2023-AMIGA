package es.udc.paproject.backend.model.entities;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
public class AnnualData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "participant_id")
    private Participant participant;

    private LocalDate date;
    private boolean returned;

    @ManyToMany
    @JoinTable(name = "participant_countrie", joinColumns = @JoinColumn(name = "participant_id"), inverseJoinColumns = @JoinColumn(name = "country_id"))
    private Set<Country> nationalities = new HashSet<>();

    private String address;
    private String postalAddress;
    @ManyToOne
    @JoinColumn(name = "municipality_id")
    private Municipality municipality;

    @ManyToOne
    @JoinColumn(name = "Province_id")
    private Province province;

    @Enumerated(EnumType.STRING)
    private AdministrativeSituation situation;

    @ManyToOne
    @JoinColumn(name = "studies_id")
    private Studies studies;

    @Enumerated(EnumType.STRING)
    private Approved approved;

    @ManyToMany
    @JoinTable(name = "participant_language", joinColumns = @JoinColumn(name = "participant_id"), inverseJoinColumns = @JoinColumn(name = "language_id"))
    private Set<Language> languages = new HashSet<>();

    private String demandedStudies;
    private boolean registered;

    private LocalDate dateRegister;
    private int numberRegistered;
    @ManyToOne
    @JoinColumn(name = "cohabitation_id")
    private Cohabitation cohabitation;
    @ManyToOne
    @JoinColumn(name = "housing_id")
    private Housing housing;
    @ManyToOne
    @JoinColumn(name = "maritalStatus_id")
    private MaritalStatus maritalStatus;
    @ManyToMany
    @JoinTable(name = "participant_exclusionFactor", joinColumns = @JoinColumn(name = "participant_id"), inverseJoinColumns = @JoinColumn(name = "exclusionFactor_id"))
    private Set<ExclusionFactor> exclusionFactors = new HashSet<>();
    private String socialWorker;
    private String healthCoverage;
    @Enumerated(EnumType.STRING)
    private Disability disability;

    private boolean unemployedHousehold;
    private boolean oneAdultHousehold;
    private boolean dependants;

    @ManyToOne
    @JoinColumn(name = "employment_id")
    private Employment employment;

    private String qualification;

    private String profExpOrigin;
    private String profExpSpain;

    private String skills;
    private String AvailableHours;

    private boolean drivingLicence;

    private boolean valid;
    private boolean vehicle;

    private boolean sepe;

    private int monthsSepe;

    @Enumerated(EnumType.STRING)
    private Benefit benefit;

    private LocalDate dateBenefit;

    private String SpecialBenefit;

    @ManyToOne
    @JoinColumn(name = "demand_id")
    private Demand demand;

    @OneToMany(mappedBy = "annualData")
    private Set<Participant_program> programs = new HashSet<>();
    private String derivation;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public Participant getParticipant() {
        return participant;
    }

    public void setParticipant(Participant participant) {
        this.participant = participant;
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

    public Set<Country> getNationalities() {
        return nationalities;
    }

    public void setNationalities(Set<Country> nationalities) {
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

    public Municipality getMunicipality() {
        return municipality;
    }

    public void setMunicipality(Municipality municipality) {
        this.municipality = municipality;
    }

    public Province getProvince() {
        return province;
    }

    public void setProvince(Province province) {
        this.province = province;
    }

    public AdministrativeSituation getSituation() {
        return situation;
    }

    public void setSituation(AdministrativeSituation situation) {
        this.situation = situation;
    }

    public Studies getStudies() {
        return studies;
    }

    public void setStudies(Studies studies) {
        this.studies = studies;
    }

    public Set<Language> getLanguages() {
        return languages;
    }

    public void setLanguages(Set<Language> languages) {
        this.languages = languages;
    }

    public Approved getApproved() {
        return approved;
    }

    public void setApproved(Approved approved) {
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

    public Cohabitation getCohabitation() {
        return cohabitation;
    }

    public void setCohabitation(Cohabitation cohabitation) {
        this.cohabitation = cohabitation;
    }

    public Housing getHousing() {
        return housing;
    }

    public void setHousing(Housing housing) {
        this.housing = housing;
    }

    public Set<ExclusionFactor> getExclusionFactors() {
        return exclusionFactors;
    }

    public void setExclusionFactors(Set<ExclusionFactor> exclusionFactors) {
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

    public Disability getDisability() {
        return disability;
    }

    public void setDisability(Disability disability) {
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

    public Employment getEmployment() {
        return employment;
    }

    public void setEmployment(Employment employment) {
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
        return AvailableHours;
    }

    public void setAvailableHours(String availableHours) {
        AvailableHours = availableHours;
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

    public Benefit getBenefit() {
        return benefit;
    }

    public void setBenefit(Benefit benefit) {
        this.benefit = benefit;
    }

    public LocalDate getDateBenefit() {
        return dateBenefit;
    }

    public void setDateBenefit(LocalDate dateBenefit) {
        this.dateBenefit = dateBenefit;
    }

    public String getSpecialBenefit() {
        return SpecialBenefit;
    }

    public void setSpecialBenefit(String specialBenefit) {
        SpecialBenefit = specialBenefit;
    }

    public Demand getDemand() {
        return demand;
    }

    public void setDemand(Demand demand) {
        this.demand = demand;
    }

    public Set<Participant_program> getPrograms() {
        return programs;
    }

    public void setPrograms(Set<Participant_program> programs) {
        this.programs = programs;
    }

    public String getDerivation() {
        return derivation;
    }

    public void setDerivation(String derivation) {
        this.derivation = derivation;
    }

    public MaritalStatus getMaritalStatus() {
        return maritalStatus;
    }

    public void setMaritalStatus(MaritalStatus maritalStatus) {
        this.maritalStatus = maritalStatus;
    }
}
