import React, {useEffect, useState} from 'react';
import {TextField, Button, Card, CardContent, DialogTitle, DialogContent, DialogActions, Dialog} from '@mui/material';
import backend from "../../../backend";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import * as selectors from "../selectors";
import * as actions from "../actions";
import {BackLink} from "../../common";
import Typography from "@mui/material/Typography";
import "./Participant.css"

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
                        <Card className="item">
                            <CardContent>
                                <div className="observation-header">
                                    <Typography variant="h5">
                                        {observation.date.split("-").reverse().join("-")}
                                    </Typography>
                                    <div className="bigSpace"></div>
                                    <Typography variant="h5">
                                        {observation.title}
                                    </Typography>
                                </div>
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
                <DialogContent>
                    {/* Aquí puedes mostrar los detalles de los datos guardados */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal}>Aceptar</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openDelete} onClose={handleCloseDeleteModal}>
                <DialogTitle>Eliminar la observación?</DialogTitle>
                <DialogContent>
                    {/* Aquí puedes mostrar los detalles de los datos guardados */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteClick}>Confirmar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ObservationView;
