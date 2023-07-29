import * as actionTypes from './actionTypes';
import * as selectors from './selectors';
import backend from "../../backend";

export const loading = () => ({
    type: actionTypes.LOADING
});

export const loaded = () => ({
    type: actionTypes.LOADED
});

export const error = error => ({
    type: actionTypes.ERROR,
    error
});

const findAllCountriesCompleted = countries => ({
    type: actionTypes.FIND_ALL_COUNTRIES_COMPLETED,
    countries
});

export const findAllCountries = () => (dispatch, getState) => {

    const countries = selectors.getCountries(getState());

    if (!countries) {

        backend.selectors.findCountries(
            countries => dispatch(findAllCountriesCompleted(countries))
        );
    }
}
const findAllProvincesCompleted = provinces => ({
    type: actionTypes.FIND_ALL_PROVINCES_COMPLETED,
    provinces
});

export const findAllProvinces = () => (dispatch, getState) => {

    const provinces = selectors.getProvinces(getState());

    if (!provinces) {

        backend.selectors.findProvinces(
            provinces => dispatch(findAllProvincesCompleted(provinces))
        );
    }
}
const findAllMunicipalitiesCompleted = municipalities => ({
    type: actionTypes.FIND_ALL_MUNICIPALITIES_COMPLETED,
    municipalities
});

export const findAllMunicipalities = () => (dispatch, getState) => {

    const municipalities = selectors.getMunicipalities(getState());

    if (!municipalities) {

        backend.selectors.findMunicipalities(
            municipalities => dispatch(findAllMunicipalitiesCompleted(municipalities))
        );
    }
}
const findAllLanguagesCompleted = languages => ({
    type: actionTypes.FIND_ALL_LANGUAGES_COMPLETED,
    languages
});

export const findAllLanguages = () => (dispatch, getState) => {

    const languages = selectors.getLanguages(getState());

    if (!languages) {

        backend.selectors.findLanguages(
            languages => dispatch(findAllLanguagesCompleted(languages))
        );
    }
}
const findAllEmploymentsCompleted = employments => ({
    type: actionTypes.FIND_ALL_EMPLOYMENTS_COMPLETED,
    employments
});

export const findAllEmployments = () => (dispatch, getState) => {

    const employments = selectors.getEmployments(getState());

    if (!employments) {

        backend.selectors.findEmployments(
            employments => dispatch(findAllEmploymentsCompleted(employments))
        );
    }
}
const findAllStudiesCompleted = studies => ({
    type: actionTypes.FIND_ALL_STUDIES_COMPLETED,
    studies
});

export const findAllStudies = () => (dispatch, getState) => {

    const studies = selectors.getStudies(getState());

    if (!studies) {

        backend.selectors.findStudies(
            studies => dispatch(findAllStudiesCompleted(studies))
        );
    }
}
const findAllMaritalStatusCompleted = maritalStatus => ({
    type: actionTypes.FIND_ALL_MARITALSTATUS_COMPLETED,
    maritalStatus
});

export const findAllMaritalStatus = () => (dispatch, getState) => {

    const maritalStatus = selectors.getMaritalStatus(getState());

    if (!maritalStatus) {

        backend.selectors.findMaritalStatus(
            maritalStatus => dispatch(findAllMaritalStatusCompleted(maritalStatus))
        );
    }
}
const findAllHousingsCompleted = housings => ({
    type: actionTypes.FIND_ALL_HOUSINGS_COMPLETED,
    housings
});

export const findAllHousings = () => (dispatch, getState) => {

    const housings = selectors.getHousings(getState());

    if (!housings) {

        backend.selectors.findHousings(
            housings => dispatch(findAllHousingsCompleted(housings))
        );
    }
}
const findAllCohabitationsCompleted = cohabitations => ({
    type: actionTypes.FIND_ALL_COHABITATION_COMPLETED,
    cohabitations
});

export const findAllCohabitations = () => (dispatch, getState) => {

    const cohabitations = selectors.getCohabitations(getState());

    if (!cohabitations) {

        backend.selectors.findCohabitation(
            cohabitations => dispatch(findAllCohabitationsCompleted(cohabitations))
        );
    }
}
const findAllExclusionsCompleted = exclusions => ({
    type: actionTypes.FIND_ALL_EXCLUSIONS_COMPLETED,
    exclusions
});

export const findAllExclusions = () => (dispatch, getState) => {

    const exclusions = selectors.getExclusions(getState());

    if (!exclusions) {

        backend.selectors.findExclusions(
            exclusions => dispatch(findAllExclusionsCompleted(exclusions))
        );
    }
}
const findAllProgramsCompleted = programs => ({
    type: actionTypes.FIND_ALL_PROGRAMS_COMPLETED,
    programs
});

export const findAllPrograms = () => (dispatch, getState) => {

    const programs = selectors.getPrograms(getState());

    if (!programs) {

        backend.selectors.findPrograms(
            programs => dispatch(findAllProgramsCompleted(programs))
        );
    }
}
const findAllDemandsCompleted = demands => ({
    type: actionTypes.FIND_ALL_DEMANDS_COMPLETED,
    demands
});

export const findAllDemands = () => (dispatch, getState) => {

    const demands = selectors.getDemands(getState());

    if (!demands) {

        backend.selectors.findDemands(
            demands => dispatch(findAllDemandsCompleted(demands))
        );
    }
}