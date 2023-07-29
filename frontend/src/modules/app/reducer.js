import {combineReducers} from 'redux';

import * as actionTypes from './actionTypes';

const initialState = {
    error: null,
    loading: false,
    countries: null,
    municipalities: null,
    provinces: null,
    languages: null,
    employments: null,
    studies: null,
    maritalStatus: null,
    housings: null,
    cohabitations: null,
    exclusions: null,
    programs: null,
    demands: null
};

const error = (state = initialState.error, action) => {

    switch (action.type) {

        case actionTypes.ERROR:
            return action.error;

        default:
            return state;

    }

}

const loading = (state = initialState.loading, action) => {

    switch (action.type) {

        case actionTypes.LOADING:
            return true;

        case actionTypes.LOADED:
            return false;

        case actionTypes.ERROR:
            return false;

        default:
            return state;

    }
}
const countries = (state = initialState.countries, action) => {

    switch (action.type) {

        case actionTypes.FIND_ALL_COUNTRIES_COMPLETED:
            return action.countries;

        default:
            return state;

    }

}
const provinces = (state = initialState.provinces, action) => {

    switch (action.type) {

        case actionTypes.FIND_ALL_PROVINCES_COMPLETED:
            return action.provinces;

        default:
            return state;

    }

}
const municipalities = (state = initialState.municipalities, action) => {

    switch (action.type) {

        case actionTypes.FIND_ALL_MUNICIPALITIES_COMPLETED:
            return action.municipalities;

        default:
            return state;

    }

}
const languages = (state = initialState.languages, action) => {

    switch (action.type) {

        case actionTypes.FIND_ALL_LANGUAGES_COMPLETED:
            return action.languages;

        default:
            return state;

    }

}
const employments = (state = initialState.employments, action) => {

    switch (action.type) {

        case actionTypes.FIND_ALL_EMPLOYMENTS_COMPLETED:
            return action.employments;

        default:
            return state;

    }

}
const studies = (state = initialState.studies, action) => {

    switch (action.type) {

        case actionTypes.FIND_ALL_STUDIES_COMPLETED:
            return action.studies;

        default:
            return state;

    }

}
const maritalStatus = (state = initialState.maritalStatus, action) => {

    switch (action.type) {

        case actionTypes.FIND_ALL_MARITALSTATUS_COMPLETED:
            return action.maritalStatus;

        default:
            return state;

    }

}
const housings = (state = initialState.housings, action) => {

    switch (action.type) {

        case actionTypes.FIND_ALL_HOUSINGS_COMPLETED:
            return action.housings;

        default:
            return state;

    }

}
const cohabitations = (state = initialState.cohabitations, action) => {

    switch (action.type) {

        case actionTypes.FIND_ALL_COHABITATION_COMPLETED:
            return action.cohabitations;

        default:
            return state;

    }

}
const programs = (state = initialState.programs, action) => {

    switch (action.type) {

        case actionTypes.FIND_ALL_PROGRAMS_COMPLETED:
            return action.programs;

        default:
            return state;

    }

}
const exclusions = (state = initialState.exclusions, action) => {

    switch (action.type) {

        case actionTypes.FIND_ALL_EXCLUSIONS_COMPLETED:
            return action.exclusions;

        default:
            return state;

    }

}
const demands = (state = initialState.demands, action) => {

    switch (action.type) {

        case actionTypes.FIND_ALL_DEMANDS_COMPLETED:
            return action.demands;

        default:
            return state;

    }

}
const reducer = combineReducers({
    error,
    loading,
    countries,
    provinces,
    municipalities,
    languages,
    employments,
    studies,
    maritalStatus,
    housings,
    cohabitations,
    exclusions,
    programs,
    demands
});

export default reducer;