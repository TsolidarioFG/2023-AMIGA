const getModuleState = state => state.participant;

export const getParticipantData = state =>
    getModuleState(state).participant;

export const getObservations = state =>
    getModuleState(state).observations;

export const getObservationsItems = state =>
    getModuleState(state).observations.result.items;