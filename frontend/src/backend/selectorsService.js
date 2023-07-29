import {appFetch, config} from "./appFetch";

export const findCountries = (onSuccess) =>
    appFetch('/selector/countries', config('GET'), onSuccess);

export const findProvinces = (onSuccess) =>
    appFetch('/selector/provinces', config('GET'), onSuccess);

export const findMunicipalities = (onSuccess) =>
    appFetch('/selector/municipalities', config('GET'), onSuccess);

export const findLanguages = (onSuccess) =>
    appFetch('/selector/languages', config('GET'), onSuccess);

export const findStudies = (onSuccess) =>
    appFetch('/selector/studies', config('GET'), onSuccess);

export const findEmployments = (onSuccess) =>
    appFetch('/selector/employments', config('GET'), onSuccess);

export const findMaritalStatus = (onSuccess) =>
    appFetch('/selector/maritalstatus', config('GET'), onSuccess);

export const findHousings = (onSuccess) =>
    appFetch('/selector/housings', config('GET'), onSuccess);

export const findCohabitation = (onSuccess) =>
    appFetch('/selector/cohabitations', config('GET'), onSuccess);

export const findExclusions = (onSuccess) =>
    appFetch('/selector/exclusions', config('GET'), onSuccess);

export const findPrograms = (onSuccess) =>
    appFetch('/selector/programs', config('GET'), onSuccess);

export const findDemands = (onSuccess) =>
    appFetch('/selector/demands', config('GET'), onSuccess);