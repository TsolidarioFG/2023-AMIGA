import {useDispatch} from 'react-redux';
import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import './Participant.css';

import * as actions from '../actions';
import {useNavigate} from "react-router-dom";
import backend from "../../../backend";
import {Errors} from "../../common";

function Participant() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [selectedAttribute, setSelectedAttribute] = useState('dni');
    const [doc, setDoc] = useState('');
    const [selectedParticipant, setSelectedParticipant] = useState(null);
    const [backendErrors, setBackendErrors] = useState(null);

    const handleAttributeChange = (event) => {
        setSelectedAttribute(event.target.value);
    };

    const attributeOptions = ['dni', 'nie', 'pas'];

    const handleGetDetails = () => {
       // dispatch(actions.setParticipantSummary(selectedParticipant));
        dispatch(actions.findParticipant(
            selectedParticipant.id,
            Math.max(...selectedParticipant.yearList),));
        dispatch(actions.findObservations({id: selectedParticipant.id, page: 0}));
        navigate('/participant/details')
    }
    const handleChange = (e) => {
        setDoc(e.target.value);
    };

    const handleFind = (event) => {
        event.preventDefault();

        let validFormat = true;
        if (selectedAttribute === 'dni') {
            validFormat = actions.validarFormatoDNI(doc);
        }else if(selectedAttribute === 'nie'){
            validFormat = actions.validarFormatoNIE(doc);
        }

        if (!validFormat) {
            setBackendErrors({globalError: 'Formato de documento incorrecto'});
            setSelectedParticipant(null);
            return;
        }

        backend.participant.getParticipantSummaryData(
            selectedAttribute,
            doc,
            (participant) => setSelectedParticipant(participant),
            (errors) => {
                setSelectedParticipant(null);
                setBackendErrors(errors);
            }
        );
    };


    return (
        <div className="container">
            <div className="button">
                <Button variant="contained" onClick={() => {
                    navigate('/participant/form');
                }}>
                    Registrar participante
                </Button>
            </div>
            <form onSubmit={handleFind}>
                <div className="participant-container">
                    <FormControl className="item" style={{position: 'relative'}}>
                        <InputLabel id="attribute-label">Seleccionar filtro</InputLabel>
                        <Select
                            labelId="attribute-label"
                            label="Seleccionar filtro"
                            id="attribute"
                            value={selectedAttribute}
                            onChange={handleAttributeChange}
                        >
                            {attributeOptions.map((attribute) => (
                                <MenuItem key={attribute} value={attribute}>
                                    {attribute.toUpperCase()}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        className="item2"
                        value={doc}
                        onChange={handleChange}
                        label="Documento"
                        placeholder="Documento"
                        required
                    />
                    <div className="space"></div>
                    <Button variant="contained" color="primary" type="submit">
                        Buscar
                    </Button>

                </div>
            </form>
            <br/>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
            {selectedParticipant && (
                <div className="participant-details">
                    <Typography variant="h6">{selectedParticipant.name} {selectedParticipant.surnames}</Typography>
                    <Typography>Email: {selectedParticipant.email}</Typography>
                    <Typography>Teléfono: {selectedParticipant.phone}</Typography>
                    <br/>
                    <Button variant="contained" onClick={handleGetDetails}>
                        Ver detalles
                    </Button>
                </div>
            )}
        </div>
    );
}

export default Participant;
