import React, { useState } from 'react';
import { Container, TextField, Button } from '@mui/material';
import backend from "../../../backend";
import Box from "@mui/material/Box";
import axios from 'axios';

const GenerateStatitics = () => {
    const [startDate, setstartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(true);

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
        axios({
            url: `${process.env.REACT_APP_BACKEND_URL}/participant/downloadExcel?startDate=${startDate}&endDate=${endDate}`,
            method: 'get',
            responseType: 'blob',
           // headers: {
           //     Authorization: 'Bearer ' + sessionStorage.getItem('serviceToken')
            //},
        }).then((response) => {
            // create a Blob object from the response data
            const blob = new Blob([response.data], {
                type: response.headers['content-type'],
            });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'Estadisticas' + startDate.split("-")[0] + "-" + endDate.split("-")[0] + '.xls'; // set the filename here
            link.click();
        });
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
