package es.udc.paproject.backend.model.services;

import es.udc.paproject.backend.model.entities.*;

import java.util.List;

public interface SelectorService {

    List<Country> getCountries();

    List<Province> getProvinces();

    List<Municipality> getMunicipalities();

    List<Language> getLanguages();

    List<Employment> getEmploymentSituations();

    List<Studies> getStudies();

    List<MaritalStatus> getMaritalStatus();

    List<Housing> getHousings();

    List<Cohabitation> getCohabitation();

    List<ExclusionFactor> getExclusionFactors();

    List<Program> getPrograms();

    List<Demand> getDemands();

    List<Contract> getContracts();
}
