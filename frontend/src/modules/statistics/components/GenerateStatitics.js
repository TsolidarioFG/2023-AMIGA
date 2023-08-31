import React, { useState } from 'react';
import { Container, TextField, Button } from '@mui/material';
import Box from "@mui/material/Box";
import * as actions from "../actions"
import * as appActions from "../../app/actions"
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

const GenerateStatitics = () => {
    const [startDate, setstartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleFechaInicioChange = (event) => {
        setstartDate(event.target.value);
        enableButton(event.target.value, endDate);
    };

    const handleFechaFinChange = (event) => {
        setEndDate(event.target.value);
        enableButton(startDate, event.target.value);
    };

    const enableButton = (inicio, fin) => {
        if(inicio !== '' && fin !== '')
            setButtonDisabled(false);
    };

    const handleExportExcel = () => {
        dispatch(appActions.loading());
        dispatch(actions.getStatistics(startDate, endDate));
        actions.exportExcel(startDate, endDate);
        navigate("/statistics/graphics");

    };

    return (
        <Container maxWidth="sm">
            <h2>Generar Estadísticas</h2>
            <br/>
            <Box marginBottom={2}>
                <TextField
                    type="date"
                    label="Fecha de inicio"
                    value={startDate}
                    onChange={handleFechaInicioChange}
                    placeholder="Fecha de inicio"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                />
            </Box>
            <Box marginBottom={2}>
                <TextField
                    type="date"
                    label="Fecha de fin"
                    value={endDate}
                    onChange={handleFechaFinChange}
                    placeholder="Fecha de fin"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                />
            </Box>
            <Button
                variant="contained"
                color="primary"
                id="generarButton"
                disabled={buttonDisabled}
                onClick={handleExportExcel}
                fullWidth
            >
                Generar Excel
            </Button>
        </Container>
    );
};

export default GenerateStatitics;
