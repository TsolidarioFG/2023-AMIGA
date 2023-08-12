import {combineReducers} from 'redux';

import app from '../modules/app';
import users from '../modules/users';
import participant from "../modules/participant";
import statistics from "../modules/statistics";

const rootReducer = combineReducers({
    app: app.reducer,
    users: users.reducer,
    participant: participant.reducer,
    statistics: statistics.reducer
});

export default rootReducer;
