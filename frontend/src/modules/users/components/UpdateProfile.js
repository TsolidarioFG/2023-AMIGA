import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import {
    TextField,
    Button,
    Card,
    CardHeader,
    CardContent,
    Grid,
} from '@mui/material';

import {BackLink, Errors} from '../../common';
import * as actions from '../actions';
import * as selectors from '../selectors';

const UpdateProfile = () => {
    const user = useSelector(selectors.getUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [email, setEmail] = useState(user.email);
    const [backendErrors, setBackendErrors] = useState(null);
    let form;

    const handleSubmit = (event) => {
        event.preventDefault();

        if (form.checkValidity()) {
            dispatch(
                actions.updateProfile(
                    {
                        id: user.id,
                        firstName: firstName.trim(),
                        lastName: lastName.trim(),
                        email: email.trim(),
                    },
                    () => navigate(-1),
                    (errors) => setBackendErrors(errors)
                )
            );
        } else {
            setBackendErrors(null);
            form.classList.add('was-validated');
        }
    };

    return (
        <div className="container">
            <div className="row">
                <BackLink></BackLink>
            </div>
            <br/>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)} />
            <Card variant="outlined">
                <CardHeader
                    title={<FormattedMessage id="project.users.UpdateProfile.title" />}
                />
                <CardContent>
                    <form
                        ref={(node) => (form = node)}
                        className="needs-validation"
                        noValidate
                        onSubmit={(e) => handleSubmit(e)}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="firstName"
                                    label={<FormattedMessage id="project.global.fields.firstName" />}
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    autoFocus
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="lastName"
                                    label={<FormattedMessage id="project.global.fields.lastName" />}
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="email"
                                    label={<FormattedMessage id="project.global.fields.email" />}
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid container justifyContent="center" alignItems="center" style={{ marginTop: '30px' }}>
                                <Grid item xs={8} md={4}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                    >
                                        <FormattedMessage id="project.global.buttons.save" />
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default UpdateProfile;
