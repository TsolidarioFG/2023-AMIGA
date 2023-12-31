import React, {useEffect, useState} from 'react';
import {TextField, Button, Card, CardContent, DialogTitle, DialogActions, Dialog} from '@mui/material';
import backend from "../../../backend";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import * as selectors from "../selectors";
import * as actions from "../actions";
import {BackLink} from "../../common";
import Typography from "@mui/material/Typography";
import "./Participant.css"
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

const ObservationView = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [observation, setObservation] = useState(null);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);


    const navigate = useNavigate();
    const observations = useSelector(selectors.getObservations);
    const dispatch = useDispatch();
    const {id} = useParams();

    useEffect(() => {

        const observationId = Number(id);

        if (!Number.isNaN(observationId) && observations !== null) {
            setObservation(observations.result.items.find(obs => obs.id === observationId));
        }

    }, [id, dispatch, observations]);


    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        backend.observation.updateObservation(observation,
            () => {
                dispatch(actions.findObservations(observations.criteria));
                setOpenUpdate(true);
            });
    };

    const handleCancelClick = () => {
        navigate(-1)
    };
    const handleOpenDeleteModal = () => {
        setOpenDelete(true);
    };
    const handleCloseDeleteModal = () => {
        setOpenDelete(false);
    }

    const handleDeleteClick = () => {
        backend.observation.deleteObservation(observation.id,
            () => {
                dispatch(actions.findObservations(observations.criteria));
                navigate(-1);
            }
        )
    };

    const handleCloseModal = () => {
        setOpenUpdate(false);
        navigate(-1);
    }
    const getStringType = (type) => {
        switch (type) {
            case "GENERAL":
                return ("General");
            case "LEGAL":
                return ("Juridico");
            case "LABOUR":
                return ("Laboral");
            default:
                return "";
        }
    };

    if (observation === null)
        return null;

    return (
        <div className="container">
            <div className="row">
                <BackLink></BackLink>
            </div>
            <br/>
            <br/>
            {isEditing ? (
                <>
                    <div className="row-container">
                        <TextField
                            className="item"
                            type="date"
                            value={observation.date}
                            onChange={(e) => setObservation({...observation, date: e.target.value})}
                            required
                        />
                        <FormControl className="item">
                            <InputLabel id="type-label">Tipo</InputLabel>
                            <Select
                                id="type"
                                labelId="type-label"
                                label="Tipo"
                                name="type"
                                value={observation.observationType}
                                onChange={(e) => setObservation({...observation, observationType: e.target.value})}
                                required
                            >
                                <MenuItem value="GENERAL">General</MenuItem>
                                <MenuItem value="LEGAL">Juridico</MenuItem>
                                <MenuItem value="LABOUR">Laboral</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            className="item2"
                            label="Título"
                            value={observation.title}
                            onChange={(e) => setObservation({...observation, title: e.target.value})}
                            required
                        />
                    </div>
                    <div className="row-container">
                        <TextField
                            className="item"
                            label="Texto"
                            multiline
                            rows={4}
                            value={observation.text}
                            onChange={(e) => setObservation({...observation, text: e.target.value})}
                            required
                        />
                    </div>
                </>
            ) : (
                <>
                    <div className="row">
                        <Card className="item" style={{ backgroundColor: 'lightyellow' }}>
                            <CardContent>
                                <div className="observation-header">
                                    <Typography variant="h5">
                                        {"Fecha: " + observation.date.split("-").reverse().join("-")}
                                    </Typography>
                                    <div className="bigSpace"></div>
                                    <Typography variant="h5">
                                        {"Tipo: " + getStringType(observation.observationType) }
                                    </Typography>
                                </div>
                                <br/>
                                <Typography variant="h5">
                                    {"Titulo: " + observation.title}
                                </Typography>
                                <br/>
                                <Typography variant="body1">
                                    {observation.text}
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                    <br/>
                </>
            )}
            <div>
                {isEditing ? (
                    <div className="center">
                        <Button variant="contained" color="primary" onClick={handleSaveClick}>
                            Guardar
                        </Button>
                        <div className="bigSpace"></div>
                        <Button variant="contained" onClick={handleCancelClick}>
                            Cancelar
                        </Button>
                    </div>
                ) : (
                    <div className="center">
                        <Button variant="contained" color="primary" onClick={handleEditClick}>
                            Editar
                        </Button>
                        <div className="bigSpace"></div>
                        <Button variant="contained" color="error" onClick={handleOpenDeleteModal}>
                            Eliminar
                        </Button>
                    </div>
                )}
            </div>
            <Dialog open={openUpdate} onClose={handleCloseModal}>
                <DialogTitle>Datos guardados correctamente</DialogTitle>
                <DialogActions>
                    <Button onClick={handleCloseModal}>Aceptar</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openDelete} onClose={handleCloseDeleteModal}>
                <DialogTitle>Eliminar la observación?</DialogTitle>
                <DialogActions>
                    <Button onClick={handleDeleteClick}>Confirmar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ObservationView;
