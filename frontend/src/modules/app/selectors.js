const getModuleState = state => state.app;

export const getError = state => getModuleState(state).error;

export const isLoading = state => getModuleState(state).loading;

export const selectors = state => getModuleState(state);

export const getCountries = state =>
    getModuleState(state).countries;
export const getProvinces = state =>
    getModuleState(state).provinces;
export const getMunicipalities = state =>
    getModuleState(state).municipalities;
export const getLanguages = state =>
    getModuleState(state).languages;
export const getEmployments = state =>
    getModuleState(state).employments;
export const getStudies = state =>
    getModuleState(state).studies;
export const getMaritalStatus = state =>
    getModuleState(state).maritalStatus;
export const getHousings = state =>
    getModuleState(state).housings;
export const getCohabitations = state =>
    getModuleState(state).cohabitations;
export const getExclusions = state =>
    getModuleState(state).exclusions;
export const getPrograms = state =>
    getModuleState(state).programs;
export const getDemands = state =>
    getModuleState(state).demands;

export const getProgramName = (programs, id) => {

    if (!programs) {
        return '';
    }

    const program = programs.find(program => program.id === id);

    if (!program) {
        return '';
    }

    return program.name;

}