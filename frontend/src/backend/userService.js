import {config, appFetch, setServiceToken, getServiceToken, removeServiceToken, setReauthenticationCallback} from './appFetch';

export const login = (userName, password, onSuccess, onErrors, reauthenticationCallback) =>
    appFetch('/users/login', config('POST', {userName, password}),
        authenticatedUser => {
            setServiceToken(authenticatedUser.serviceToken);
            setReauthenticationCallback(reauthenticationCallback);
            onSuccess(authenticatedUser);
        }, 
        onErrors);

export const tryLoginFromServiceToken = (onSuccess, reauthenticationCallback) => {

    const serviceToken = getServiceToken();

    if (!serviceToken) {
        onSuccess();
        return;
    }

    setReauthenticationCallback(reauthenticationCallback);

    appFetch('/users/loginFromServiceToken', config('POST'),
        authenticatedUser => onSuccess(authenticatedUser),
        () => removeServiceToken()
    );

}

export const signUp = (user, onSuccess, onErrors, reauthenticationCallback) => {

    appFetch('/users/signUp', config('POST', user), 
        authenticatedUser => {
            setServiceToken(authenticatedUser.serviceToken);
            setReauthenticationCallback(reauthenticationCallback);
            onSuccess(authenticatedUser);
        }, 
        onErrors);

}

export const logout = () => removeServiceToken();

export const updateProfile = (user, onSuccess, onErrors) =>
    appFetch(`/users/${user.id}`, config('PUT', user),
        onSuccess, onErrors);

export const search = (keyword, onSuccess) =>
    appFetch(`/users/search?keyword=${keyword}`, config('GET'),
        onSuccess);

export const changePassword = (id, oldPassword, newPassword, onSuccess,
    onErrors) =>
    appFetch(`/users/${id}/changePassword`, 
        config('POST', {oldPassword, newPassword}),
        onSuccess, onErrors);

export const promoteUser = (id, onSucess) =>
    appFetch(`/users/promote/${id}`, config('PATCH'), onSucess);

export const demoteUser = (id, onSucess) =>
    appFetch(`/users/demote/${id}`, config('PATCH'), onSucess);

export const deleteUser = (id, onSucess) =>
    appFetch(`/users/${id}`, config('DELETE'), onSucess);