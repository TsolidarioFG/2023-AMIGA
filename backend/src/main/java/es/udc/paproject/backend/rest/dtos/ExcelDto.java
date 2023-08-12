package es.udc.paproject.backend.rest.dtos;

import es.udc.paproject.backend.model.entities.AnnualData;
import es.udc.paproject.backend.model.entities.Participant;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;
import java.util.Map;

public class ExcelDto {

  List<ParticipantExcelDto> participantExcelDtoList;
  Map<String, Integer> exclusionFactorCountMen;
  Map<String, Integer> exclusionFactorCountWoman;
  Map<String, Integer> nationalitiesCountMen;
  Map<String, Integer> nationalitiesCountWoman;
  Map<String, Integer> contractCountMen;
  Map<String, Integer> contractCountWoman;
  Map<String, Integer> workTimeCountMen;
  Map<String, Integer> workTimeCountWoman;

  public ExcelDto() {
  }

  public Map<String, Integer> getContractCountMen() {
    return contractCountMen;
  }

  public void setContractCountMen(Map<String, Integer> contractCountMen) {
    this.contractCountMen = contractCountMen;
  }

  public Map<String, Integer> getContractCountWoman() {
    return contractCountWoman;
  }

  public void setContractCountWoman(Map<String, Integer> contractCountWoman) {
    this.contractCountWoman = contractCountWoman;
  }

  public Map<String, Integer> getWorkTimeCountMen() {
    return workTimeCountMen;
  }

  public void setWorkTimeCountMen(Map<String, Integer> workTimeCountMen) {
    this.workTimeCountMen = workTimeCountMen;
  }

  public Map<String, Integer> getWorkTimeCountWoman() {
    return workTimeCountWoman;
  }

  public void setWorkTimeCountWoman(Map<String, Integer> workTimeCountWoman) {
    this.workTimeCountWoman = workTimeCountWoman;
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

  public List<ParticipantExcelDto> getParticipantExcelDtoList() {
    return participantExcelDtoList;
  }

  public void setParticipantExcelDtoList(List<ParticipantExcelDto> participantExcelDtoList) {
    this.participantExcelDtoList = participantExcelDtoList;
  }
}
