import * as actionTypes from './actionTypes';

const initialState = {
    statistics: null
};
const statisticsReducer = (state = initialState.statistics, action) => {

    switch (action.type) {

        case actionTypes.FIND_STATISTICS_COMPLETED:
            return action.statistics;

        default:
            return state;

    }

}
export default statisticsReducer;