import {appFetch, config} from "./appFetch";

export const getObservation = (criteria, onSuccess) =>
    appFetch(`/observation/get`, config('POST', criteria), onSuccess);

export const createObservation = ( data, onSuccess, onErrors) => {

    appFetch(`/observation/create`, config('POST', data), onSuccess, onErrors);
}

export const updateObservation = ( data, onSuccess) => {

    appFetch(`/observation`, config('PUT', data), onSuccess);
}

export const deleteObservation = ( id, onSuccess) => {

    appFetch(`/observation?idObservation=${id}`, config('DELETE'), onSuccess);
}