import {appFetch, config} from "./appFetch";

export const getParticipants = (onSuccess) =>
    appFetch('/participant/get', config('GET'), onSuccess);

export const getParticipantData = (id, year, onSuccess) => {
    let path = '/participant/' + id + '?year=';
    path += year ? `${year}` : new Date().getFullYear();

    appFetch(path, config('GET'), onSuccess);
}
export const getParticipantSummaryData = (type, doc, onSuccess, onErrors) => {
    let path = '/participant/getByDoc?type=';
    path += type;
    path += '&doc=';
    path += doc;

    appFetch(path, config('GET'), onSuccess, onErrors);
}

export const createParticipant = ( data, onSuccess, onErrors) => {

    appFetch(`/participant/save`, config('POST', data), onSuccess, onErrors);
}

export const updateParticipant = ( data, onSuccess, onErrors) => {

    appFetch(`/participant/update`, config('PUT', data), onSuccess, onErrors);
}

export const saveAnnualData = ( data, onSuccess, onErrors) => {

    appFetch(`/participant/saveAnnualData`, config('POST', data), onSuccess, onErrors);
}