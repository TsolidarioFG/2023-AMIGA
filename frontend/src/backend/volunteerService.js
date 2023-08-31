import {appFetch, config} from "./appFetch";

export const search = (keyword, active, onSuccess) =>
    appFetch(`/volunteer/search?keyword=${keyword}&active=${active}`, config('GET'),
        onSuccess);

export const createVolunteer = ( data, onSuccess, onErrors) => {
    appFetch(`/volunteer`, config('POST', data), onSuccess, onErrors);
}

export const updateVolunteer = ( data, onSuccess, onErrors) => {
    appFetch(`/volunteer`, config('PUT', data), onSuccess, onErrors);
}

export const getVolunteer = (id, onSuccess) =>
    appFetch(`/volunteer/${id}`, config('GET'), onSuccess);

export const getVolunteerCollaborations = (id, onSuccess) =>
    appFetch(`/collaboration/byVolunteer/${id}`, config('GET'), onSuccess);

export const createCollaboration = (data, onSuccess) =>
    appFetch(`/collaboration`, config('POST', data), onSuccess);

export const updateCollaboration = (data, onSuccess) =>
    appFetch(`/collaboration`, config('PUT', data), onSuccess);

export const deleteCollaboration = (id, onSuccess) =>
    appFetch(`/collaboration/${id}`, config('DELETE'), onSuccess);