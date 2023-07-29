import {combineReducers} from 'redux';

import * as actionTypes from './actionTypes';

const initialState = {
    observations: null,
    participant: null,
};
const observations = (state = initialState.observations, action) => {

    switch (action.type) {

        case actionTypes.FIND_OBSERVATIONS_COMPLETED:
            return action.observations;

        case actionTypes.CLEAR_OBSERVATIONS:
            return initialState.observations;

        case actionTypes.ADD_OBSERVATION:
            return action.observations

        default:
            return state;

    }

}
const participant = (state = initialState.participant, action) => {

    switch (action.type) {

        case actionTypes.FIND_PARTICIPANT_DATA_COMPLETED:
            return action.participant;

        default:
            return state;

    }

}
const reducer = combineReducers({
    observations,
    participant
});

export default reducer;