import React, {useState} from 'react';
import {TextField, Button} from '@mui/material';
import backend from "../../../backend";
import {useDispatch, useSelector} from "react-redux";
import * as selectors from "../selectors";
import * as actions from "../actions"
import {Errors, HomeLink} from "../../common";
import {useNavigate} from "react-router-dom";
import { format } from 'date-fns';

const ObservationForm = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const participant = useSelector(selectors.getParticipantData);

    const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [backendErrors, setBackendErrors] = useState(null);

    const handleFechaChange = (date) => {
        setDate(date);
    };

    const handleTituloChange = (event) => {
        setTitle(event.target.value);
    };

    const handleTextoChange = (event) => {
        setText(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const observation = {
            date: date,
            title: title,
            text: text,
            participant: participant.idParticipant
        }

        backend.observation.createObservation(observation,
            () => {
                dispatch(actions.findObservations({id: participant.idParticipant, page: 0}));
                navigate('/participant/details');
            },
            errors => setBackendErrors(errors));

        setDate(format(new Date(), 'yyyy-MM-dd'));
        setTitle('');
        setText('');
    };

    if(participant === null)
        return null

    return (
        <form onSubmit={handleSubmit}>
            <div className="header">
                <h3> {'Nueva observacion ' + participant.name + ' ' + participant.surnames}</h3>
                <HomeLink></HomeLink>
            </div>
            <div className="row-container">
                <TextField
                    className="item"
                    type="date"
                    value={date}
                    onChange={handleFechaChange}
                    label="Fecha"
                    placeholder="Fecha"
                    InputLabelProps={{shrink: true}}
                    required
                />

                <TextField
                    className="item2"
                    label="Título"
                    value={title}
                    onChange={handleTituloChange}
                    required
                />
            </div>
            <div className="row-container">
                <TextField
                    className="item"
                    label="Texto"
                    multiline
                    rows={4}
                    value={text}
                    onChange={handleTextoChange}
                    required
                />
            </div>
            <div className="center">
                <Button variant="contained" color="primary" type="submit">
                    Enviar
                </Button>
            </div>
            <br/>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
        </form>

    );
};

export default ObservationForm;
