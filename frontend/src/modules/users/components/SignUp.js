import React, {useState, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {useNavigate} from 'react-router-dom';
import {
    Card,
    CardHeader,
    CardContent,
    TextField,
    Button,
    Grid,
    Select,
    MenuItem,
    FormControl,
    InputLabel
} from '@mui/material';
import {BackLink, Errors} from '../../common';
import backend from "../../../backend";

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [userType, setUserType] = useState('USER');
    const [backendErrors, setBackendErrors] = useState(null);
    const formRef = useRef(null);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (formRef.current.checkValidity()) {
            dispatch(
                backend.userService.signUp(
                    {
                        userName: userName.trim(),
                        firstName: firstName.trim(),
                        lastName: lastName.trim(),
                        email: email.trim(),
                        role: userType
                    },
                    () => navigate('/users'),
                    (errors) => setBackendErrors(errors),
                )
            );
        } else {
            setBackendErrors(null);
            formRef.current.classList.add('was-validated');
        }
    };

    return (
        <div>
            <div className="row">
                <BackLink></BackLink>
            </div>
            <br/>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
            <Card elevation={3} className="card bg-light border-dark">
                <CardHeader
                    title={<FormattedMessage id="project.users.SignUp.title"/>}
                    className="card-header"
                />
                <CardContent className="card-body">
                    <form
                        ref={formRef}
                        className="needs-validation"
                        noValidate
                        onSubmit={(e) => handleSubmit(e)}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label={<FormattedMessage id="project.global.fields.userName"/>}
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    autoFocus
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label={<FormattedMessage id="project.global.fields.firstName"/>}
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label={<FormattedMessage id="project.global.fields.lastName"/>}
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label={<FormattedMessage id="project.global.fields.email"/>}
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="user-type-label">
                                        Tipo usuario
                                    </InputLabel>
                                    <Select
                                        labelId="user-type-label"
                                        id="user-type"
                                        value={userType}
                                        label="Tipo usuario"
                                        onChange={(e) => setUserType(e.target.value)}
                                        required
                                    >
                                        <MenuItem value="USER">Técnico</MenuItem>
                                        <MenuItem value="ADMIN">Admin</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid container justifyContent="center" alignItems="center" style={{marginTop: '30px'}}>
                                <Grid item xs={12} md={6}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                    >
                                        <FormattedMessage id="project.users.SignUp.title"/>
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

export default SignUp;
