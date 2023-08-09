package es.udc.paproject.backend.rest.dtos;

import es.udc.paproject.backend.model.entities.AnnualData;
import es.udc.paproject.backend.model.entities.Participant;

import java.time.LocalDate;
import java.time.Period;
import java.util.Map;

public class StatisticsDto {

  private LocalDate date;
  private String programs;
  private String situation;
  private String returned;
  private String pi;
  private String name;
  private String surnames;
  private LocalDate birthdate;
  private int year;
  private String sex;
  private String country;
  private String municipality;
  private String province;
  private String document;
  private String workSituation;
  private String studies;
  private int numberInsertion;
  private String phone;
  private String email;
  Map<String, Integer> exclusionFactorCountMen;
  Map<String, Integer> exclusionFactorCountWoman;
  Map<String, Integer> nationalitiesCountMen;
  Map<String, Integer> nationalitiesCountWoman;

  public StatisticsDto(Participant participant, AnnualData annualData) {
    this.date = annualData.getDate();
    this.programs = annualData.getDemand().getName();
    this.situation = annualData.getSituation().toString();
    
    if(annualData.isReturned())
      this.returned = "SI";
    else 
      this.returned = "NO";
    
    if(participant.getInterviewPi() == null)
      this.pi = "NO";
    else 
      this.pi = "SI";
    
    this.name = participant.getName();
    this.surnames = participant.getSurnames();
    this.birthdate = participant.getBirthDate();

    LocalDate currentDate = LocalDate.now();
    Period period = Period.between(currentDate, participant.getBirthDate());
    this.year = period.getYears();
    
    this.sex = participant.getGender().toString();
    this.country = participant.getCountry().getName();
    this.municipality = annualData.getMunicipality().getName();
    this.province = annualData.getProvince().getName();
    
    if(participant.getDni() != null && participant.getDni().length() > 0)
      this.document = participant.getDni();
    else if(participant.getNie() != null && participant.getNie().length() > 0)
      this.document = participant.getNie();
    else 
      this.document = participant.getPas();
    
    this.workSituation = annualData.getEmployment().getName();
    this.studies = annualData.getStudies().getName();
    this.numberInsertion = 0;
    this.phone = participant.getPhone();
    this.email = participant.getEmail();
    
  }

  public Map<String, Integer> getExclusionFactorCountMen() {
    return exclusionFactorCountMen;
  }

  public void setExclusionFactorCountMen(Map<String, Integer> exclusionFactorCountMen) {
    this.exclusionFactorCountMen = exclusionFactorCountMen;
  }

  public Map<String, Integer> getNationalitiesCountMen() {
    return nationalitiesCountMen;
  }

  public void setNationalitiesCountMen(Map<String, Integer> nationalitiesCountMen) {
    this.nationalitiesCountMen = nationalitiesCountMen;
  }

  public Map<String, Integer> getExclusionFactorCountWoman() {
    return exclusionFactorCountWoman;
  }

  public void setExclusionFactorCountWoman(Map<String, Integer> exclusionFactorCountWoman) {
    this.exclusionFactorCountWoman = exclusionFactorCountWoman;
  }

  public Map<String, Integer> getNationalitiesCountWoman() {
    return nationalitiesCountWoman;
  }

  public void setNationalitiesCountWoman(Map<String, Integer> nationalitiesCountWoman) {
    this.nationalitiesCountWoman = nationalitiesCountWoman;
  }

  public LocalDate getDate() {
    return date;
  }

  public void setDate(LocalDate date) {
    this.date = date;
  }

  public String getPrograms() {
    return programs;
  }

  public void setPrograms(String programs) {
    this.programs = programs;
  }

  public String getSituation() {
    return situation;
  }

  public void setSituation(String situation) {
    this.situation = situation;
  }

  public String getReturned() {
    return returned;
  }

  public void setReturned(String returned) {
    this.returned = returned;
  }

  public String getPi() {
    return pi;
  }

  public void setPi(String pi) {
    this.pi = pi;
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

  public LocalDate getBirthdate() {
    return birthdate;
  }

  public void setBirthdate(LocalDate birthdate) {
    this.birthdate = birthdate;
  }

  public int getYear() {
    return year;
  }

  public void setYear(int year) {
    this.year = year;
  }

  public String getSex() {
    return sex;
  }

  public void setSex(String sex) {
    this.sex = sex;
  }

  public String getCountry() {
    return country;
  }

  public void setCountry(String country) {
    this.country = country;
  }

  public String getMunicipality() {
    return municipality;
  }

  public void setMunicipality(String municipality) {
    this.municipality = municipality;
  }

  public String getProvince() {
    return province;
  }

  public void setProvince(String province) {
    this.province = province;
  }

  public String getDocument() {
    return document;
  }

  public void setDocument(String document) {
    this.document = document;
  }

  public String getWorkSituation() {
    return workSituation;
  }

  public void setWorkSituation(String workSituation) {
    this.workSituation = workSituation;
  }

  public String getStudies() {
    return studies;
  }

  public void setStudies(String studies) {
    this.studies = studies;
  }

  public int getNumberInsertion() {
    return numberInsertion;
  }

  public void setNumberInsertion(int numberInsertion) {
    this.numberInsertion = numberInsertion;
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
}
