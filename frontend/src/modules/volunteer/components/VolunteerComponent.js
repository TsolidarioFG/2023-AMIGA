import React, {useState} from 'react';
import {
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@mui/material';
import backend from "../../../backend";
import {useNavigate} from "react-router-dom";

const VolunteerComponent = () => {
    const navigate = useNavigate();

    const [keyword, setKeyword] = useState('');
    const [active, setActive] = useState(false);
    const [volunteers, setVolunteers] = useState([]);

    const handleSearch = () => {
        backend.volunteer.search(keyword, active, result => setVolunteers(result));
    };

    const handleVolunteerClick = (volunteerId) => {
        navigate(`/volunteers/${volunteerId}`);
    };

    return (
        <div className="container">
            <div className="button">
                <Button variant="contained" onClick={() => {
                    navigate('/volunteers/form');
                }}>
                    Registrar voluntario
                </Button>
            </div>
            <h3> {'Buscador voluntarios'}</h3>
            <div className="row-container">
                <TextField
                    className="item"
                    label="Introuce nombre o apellidos"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <FormControlLabel
                    style={{ margin: '0 40px' }}
                    control={
                        <Checkbox

                            checked={active}
                            onChange={(e) => setActive(e.target.checked)}
                        />
                    }
                    label="Solo activos"
                />
                <Button variant="contained" onClick={handleSearch}>
                    Buscar
                </Button>
            </div>
            <br/>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Apellidos</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Teléfono</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {volunteers.map((volunteer) => (
                            <TableRow key={volunteer.id} onClick={() => handleVolunteerClick(volunteer.id)} style={{ cursor: 'pointer' }}>
                                <TableCell>{volunteer.firstName}</TableCell>
                                <TableCell>{volunteer.lastName}</TableCell>
                                <TableCell>{volunteer.email}</TableCell>
                                <TableCell>{volunteer.telephone}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default VolunteerComponent;
