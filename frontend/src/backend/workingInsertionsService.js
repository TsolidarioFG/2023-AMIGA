import {appFetch, config} from "./appFetch";

export const getWorkInsertion = (id, onSuccess) =>
    appFetch(`/work/get?idParticipant=${id}`, config('GET'), onSuccess);

export const createWorkInsertion = ( data, onSuccess, onErrors) => {

    appFetch(`/work/create`, config('POST', data), onSuccess, onErrors);
}

export const updateWorkInsertion = ( data, onSuccess) => {

    appFetch(`/work/update`, config('PUT', data), onSuccess);
}

export const deleteWorkInsertion = ( id, onSuccess) => {

    appFetch(`/work/delete?idWorkInsertion=${id}`, config('DELETE'), onSuccess);
}