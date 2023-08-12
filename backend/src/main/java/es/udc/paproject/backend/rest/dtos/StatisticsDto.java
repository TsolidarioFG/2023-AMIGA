package es.udc.paproject.backend.rest.dtos;

import java.util.List;
import java.util.Map;

public class StatisticsDto {

    int numberMen;
    int numberWoman;
    List<Integer> yearsMen;
    List<Integer> yearsWoman;
    Map<String, Integer> exclusionFactorCountMen;
    Map<String, Integer> exclusionFactorCountWoman;
    Map<String, Integer> nationalitiesCountMen;
    Map<String, Integer> nationalitiesCountWoman;
    Map<String, Integer> contractCountMen;
    Map<String, Integer> contractCountWoman;
    Map<String, Integer> workTimeCountMen;
    Map<String, Integer> workTimeCountWoman;

    public StatisticsDto() {
    }

    public void incrementNumberMen() {
        this.numberMen += 1;
    }
    public void incrementNumberWoman() {
        this.numberWoman += 1;
    }

    public int getNumberMen() {
        return numberMen;
    }

    public void setNumberMen(int numberMen) {
        this.numberMen = numberMen;
    }

    public int getNumberWoman() {
        return numberWoman;
    }

    public void setNumberWoman(int numberWoman) {
        this.numberWoman = numberWoman;
    }

    public List<Integer> getYearsMen() {
        return yearsMen;
    }

    public void setYearsMen(List<Integer> yearsMen) {
        this.yearsMen = yearsMen;
    }

    public List<Integer> getYearsWoman() {
        return yearsWoman;
    }

    public void setYearsWoman(List<Integer> yearsWoman) {
        this.yearsWoman = yearsWoman;
    }

    public Map<String, Integer> getExclusionFactorCountMen() {
        return exclusionFactorCountMen;
    }

    public void setExclusionFactorCountMen(Map<String, Integer> exclusionFactorCountMen) {
        this.exclusionFactorCountMen = exclusionFactorCountMen;
    }

    public Map<String, Integer> getExclusionFactorCountWoman() {
        return exclusionFactorCountWoman;
    }

    public void setExclusionFactorCountWoman(Map<String, Integer> exclusionFactorCountWoman) {
        this.exclusionFactorCountWoman = exclusionFactorCountWoman;
    }

    public Map<String, Integer> getNationalitiesCountMen() {
        return nationalitiesCountMen;
    }

    public void setNationalitiesCountMen(Map<String, Integer> nationalitiesCountMen) {
        this.nationalitiesCountMen = nationalitiesCountMen;
    }

    public Map<String, Integer> getNationalitiesCountWoman() {
        return nationalitiesCountWoman;
    }

    public void setNationalitiesCountWoman(Map<String, Integer> nationalitiesCountWoman) {
        this.nationalitiesCountWoman = nationalitiesCountWoman;
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
}
