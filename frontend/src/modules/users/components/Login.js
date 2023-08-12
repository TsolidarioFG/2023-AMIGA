import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {useNavigate} from 'react-router-dom';
import {Card, CardContent, TextField, Button, Typography, Container} from '@mui/material';

import {Errors} from '../../common';
import * as actions from '../actions';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [backendErrors, setBackendErrors] = useState(null);

    const containerStyle = {
        backgroundImage: `url(${process.env.PUBLIC_URL}/logopng.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    }
    const handleSubmit = event => {
        event.preventDefault();

        if (form.checkValidity()) {
            dispatch(
                actions.login(
                    userName.trim(),
                    password,
                    () => navigate('/participant'),
                    errors => setBackendErrors(errors),
                    () => {
                        navigate('/');
                        dispatch(actions.logout());
                    }
                )
            );
        } else {
            setBackendErrors(null);
            form.classList.add('was-validated');
        }
    };

    let form;

    return (
        <div style={containerStyle}>
            <Container maxWidth="sm">
                <br/>
                <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
                <br/>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h5">
                            <FormattedMessage id="project.users.Login.title"/>
                        </Typography>
                        <form
                            ref={node => (form = node)}
                            className="needs-validation"
                            noValidate
                            onSubmit={e => handleSubmit(e)}
                        >
                            <TextField
                                type="text"
                                label={<FormattedMessage id="project.global.fields.userName"/>}
                                variant="outlined"
                                fullWidth
                                value={userName}
                                onChange={e => setUserName(e.target.value)}
                                autoFocus
                                required
                                margin="normal"
                            />
                            <TextField
                                type="password"
                                label={<FormattedMessage id="project.global.fields.password"/>}
                                variant="outlined"
                                fullWidth
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                margin="normal"
                            />
                            <div className="center">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    <FormattedMessage id="project.users.Login.title"/>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </Container>
        </div>
    );
};

export default Login;
