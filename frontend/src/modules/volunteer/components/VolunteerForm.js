import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {BackLink, Errors} from "../../common";
import {useNavigate} from "react-router-dom";
import backend from "../../../backend";
import {validarFormatoDNI} from "../../participant/actions";

const VolunteerForm = () => {
    const navigate = useNavigate();

    const [backendErrors, setBackendErrors] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('');
    const [dni, setDni] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const {name} = e.nativeEvent.submitter;

        if (!validarFormatoDNI(dni)) {
            setBackendErrors({globalError: 'Formato DNI incorrecto'});
            return;
        }


        if (name === "create")
            backend.volunteer.createVolunteer({
                    firstName,
                    lastName,
                    email,
                    telephone,
                    dni
                }, navigate("/volunteers"),
                errors => setBackendErrors(errors));
        else
            backend.volunteer.createVolunteer({
                    firstName,
                    lastName,
                    email,
                    telephone,
                    dni
                }, result => navigate('/volunteers/' + result.id),
                errors => setBackendErrors(errors));
    };

    return (
        <div className="container">
            <div className="header">
                <h3> {'Registro voluntario'}</h3>
                <BackLink></BackLink>
            </div>
            <br/>
            <form onSubmit={handleSubmit}>
                <Box sx={{display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center', bgcolor: '#f0f0f0'}}>
                    <br/>
                    <TextField
                        required
                        label="Nombre"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        variant="outlined"
                        sx={{width: 400}}
                    />
                    <TextField
                        required
                        label="Apellidos"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        variant="outlined"
                        sx={{width: 400}}
                    />
                    <TextField
                        required
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        variant="outlined"
                        sx={{width: 400}}
                    />
                    <TextField
                        required
                        label="Teléfono"
                        value={telephone}
                        onChange={(e) => setTelephone(e.target.value)}
                        variant="outlined"
                        sx={{width: 400}}
                    />
                    <TextField
                        required
                        label="DNI"
                        value={dni}
                        onChange={(e) => setDni(e.target.value)}
                        variant="outlined"
                        sx={{width: 400}}
                    />
                    <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
                    <div className="center">
                        <Button type="submit" variant="contained" color="primary" name="create">
                            Crear
                        </Button>
                        <div className="bigSpace"></div>
                        <Button type="submit" variant="contained" color="primary" sx={{width: 300}} name="navigate">
                            Registrar colaboración
                        </Button>
                    </div>
                    <br/>

                </Box>
            </form>
        </div>
    );
};

export default VolunteerForm;
