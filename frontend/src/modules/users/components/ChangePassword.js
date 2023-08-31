import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {useNavigate} from 'react-router-dom';
import {Card, CardContent, CardHeader, Button, TextField} from '@mui/material';

import {BackLink, Errors} from '../../common';
import * as actions from '../actions';
import * as selectors from '../selectors';

const ChangePassword = () => {
    const user = useSelector(selectors.getUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [backendErrors, setBackendErrors] = useState(null);
    const [passwordsDoNotMatch, setPasswordsDoNotMatch] = useState(false);

    const handleSubmit = event => {
        event.preventDefault();

        if (form.checkValidity() && checkConfirmNewPassword()) {
            dispatch(
                actions.changePassword(
                    user.id,
                    oldPassword,
                    newPassword,
                    () => navigate(-1),
                    errors => setBackendErrors(errors)
                )
            );
        } else {
            setBackendErrors(null);
            form.classList.add('was-validated');
        }
    };

    const checkConfirmNewPassword = () => {
        if (newPassword !== confirmNewPassword) {
            confirmNewPasswordInput.setCustomValidity('error');
            setPasswordsDoNotMatch(true);
            return false;
        } else {
            return true;
        }
    };

    const handleConfirmNewPasswordChange = event => {
        confirmNewPasswordInput.setCustomValidity('');
        setConfirmNewPassword(event.target.value);
        setPasswordsDoNotMatch(false);
    };

    let form;
    let confirmNewPasswordInput;

    return (
        <div className="container">
            <div className="row">
                <BackLink></BackLink>
            </div>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>

            <br/>
            <Card variant="outlined">
                <CardHeader
                    title={<FormattedMessage id="project.users.ChangePassword.title"/>}
                />
                <CardContent>
                    <form
                        ref={node => (form = node)}
                        className="needs-validation"
                        noValidate
                        onSubmit={e => handleSubmit(e)}
                    >
                        <TextField
                            type="password"
                            label={<FormattedMessage id="project.users.ChangePassword.fields.oldPassword"/>}
                            variant="outlined"
                            fullWidth
                            value={oldPassword}
                            onChange={e => setOldPassword(e.target.value)}
                            autoFocus
                            required
                            margin="normal"
                        />
                        <TextField
                            type="password"
                            label={<FormattedMessage id="project.users.ChangePassword.fields.newPassword"/>}
                            variant="outlined"
                            fullWidth
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                            required
                            margin="normal"
                        />
                        <TextField
                            inputRef={node => (confirmNewPasswordInput = node)}
                            type="password"
                            label={<FormattedMessage id="project.users.ChangePassword.fields.confirmNewPassword"/>}
                            variant="outlined"
                            fullWidth
                            value={confirmNewPassword}
                            onChange={e => handleConfirmNewPasswordChange(e)}
                            required
                            error={passwordsDoNotMatch}
                            helperText={
                                passwordsDoNotMatch ? (
                                    <FormattedMessage id="project.global.validator.passwordsDoNotMatch"/>
                                ) : null
                            }
                            margin="normal"
                        />
                        <div className="center">
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                <FormattedMessage id="project.global.buttons.save"/>
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default ChangePassword;
