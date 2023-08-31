import {appFetch, config} from "./appFetch";

export const getWorkInsertion = (id, onSuccess) =>
    appFetch(`/work?idParticipant=${id}`, config('GET'), onSuccess);

export const createWorkInsertion = ( data, onSuccess, onErrors) => {

    appFetch(`/work`, config('POST', data), onSuccess, onErrors);
}

export const updateWorkInsertion = ( data, onSuccess) => {

    appFetch(`/work`, config('PUT', data), onSuccess);
}

export const deleteWorkInsertion = ( id, onSuccess) => {

    appFetch(`/work?idWorkInsertion=${id}`, config('DELETE'), onSuccess);
}