import React, {useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {useParams} from "react-router-dom";
import backend from "../../../backend";
import VolunteerUpdateModal from "./VolunteerUpdateModal";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import CollaborationCreateModal from "./CollaborationCreateModal";
import {BackLink} from "../../common";

const VolunteerDetails = () => {

    const {id} = useParams();
    const [volunteer, setVolunteer] = useState(null);
    const [collaborations, setCollaborations] = useState(null);
    const [createCollaborationModalOpen, setCreateCollaborationModalOpen] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [updateCollaborationModalOpen, setUpdateCollaborationModalOpen] = useState(false);
    const [selectedCollaborationId, setSelectedCollaborationId] = useState(null);
    const [collaborationToUpdate, setCollaborationToUpdate] = useState(null);

    console.log(collaborations)
    const volunteerId = Number(id);

    useEffect(() => {

        if (!Number.isNaN(volunteerId)) {

            backend.volunteer.getVolunteer(volunteerId, result => setVolunteer(result));
            backend.volunteer.getVolunteerCollaborations(volunteerId, result => setCollaborations(result));
        }

    }, [volunteerId]);

    const handleOpenUpdateModal = () => {
        setUpdateModalOpen(true);
    };

    const handleCloseUpdateModal = () => {
        setUpdateModalOpen(false);
    };

    const handleOpenCreateCollaborationModal = () => {
        setCreateCollaborationModalOpen(true);
    };

    const handleCloseCreateCollaborationModal = () => {
        setCreateCollaborationModalOpen(false);
    };

    const handleCreateCollaboration = (newCollaboration) => {
        backend.volunteer.createCollaboration(
            {...newCollaboration, volunteer: volunteerId},
            (result) => {
                handleCloseCreateCollaborationModal();
                setCollaborations([result, ...collaborations]);
            }
        );
    };


    const handleOpenDeleteConfirmation = (collaborationId) => {
        setSelectedCollaborationId(collaborationId);
        setDeleteConfirmationOpen(true);
    };

    const handleCloseDeleteConfirmation = () => {
        setSelectedCollaborationId(null);
        setDeleteConfirmationOpen(false);
    };

    const handleDeleteCollaboration = () => {
        if (selectedCollaborationId !== null) {
            backend.volunteer.deleteCollaboration(selectedCollaborationId,
                () => {
                    setCollaborations(prevCollaborations => prevCollaborations.filter(collaboration => collaboration.id !== selectedCollaborationId));
                    handleCloseDeleteConfirmation();
                }
            );
        }
    };


    const handleEditCollaboration = (collaborationId) => {
        const collaboration = collaborations.find(collaboration => collaboration.id === collaborationId);
        if (collaboration) {
            setCollaborationToUpdate(collaboration);
            setUpdateCollaborationModalOpen(true);
        }
    };

    const handleCloseUpdateCollaborationModal = () => {
        setUpdateCollaborationModalOpen(false);
        setCollaborationToUpdate(null);
    };

    const handleUpdateCollaboration = () => {

        backend.volunteer.updateCollaboration(collaborationToUpdate,
            () => {
                setCollaborations(collaborations.map(collaboration =>
                    collaboration.id === collaborationToUpdate.id ? collaborationToUpdate : collaboration
                ));
                handleCloseUpdateCollaborationModal();
            });
    };

    if (volunteer === null || collaborations === null)
        return null;

    return (
        <div className="container">
            <VolunteerUpdateModal
                open={updateModalOpen}
                onClose={handleCloseUpdateModal}
                volunteer={volunteer}
                setVolunteer={setVolunteer}
            />
            <CollaborationCreateModal
                open={createCollaborationModalOpen}
                onClose={handleCloseCreateCollaborationModal}
                onCreate={handleCreateCollaboration}
            />
            <div className="header">
                <Button variant="contained" onClick={handleOpenUpdateModal}>
                    Actualizar Voluntario
                </Button>
                <Button variant="contained" onClick={handleOpenCreateCollaborationModal}>
                    Crear Colaboración
                </Button>
                <BackLink></BackLink>
            </div>
            <br/>
            <Card style={{backgroundColor: 'lightyellow'}}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        Información voluntario
                    </Typography>
                    <br/>
                    <br/>
                    <div className="observation-header">
                        <Typography variant="body1" className="item">
                            Nombre: {volunteer.firstName + ' ' + volunteer.lastName}
                        </Typography>
                        <Typography variant="body1" className="item">
                            Email: {volunteer.email}
                        </Typography>
                    </div>
                    <br/>
                    <div className="observation-header">
                        <Typography variant="body1" className="item">
                            Teléfono: {volunteer.telephone}
                        </Typography>
                        <Typography variant="body1" className="item">
                            DNI: {volunteer.dni}
                        </Typography>
                    </div>
                </CardContent>
            </Card>
            <br/>
            <Typography variant="h5" component="div">
                Colaboraciones
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Fecha inicio</TableCell>
                        <TableCell>Fecha fin</TableCell>
                        <TableCell>Número horas</TableCell>
                        <TableCell>Descripción</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {collaborations.map((collaboration) => (
                        <TableRow key={collaboration.id}>
                            <TableCell>{collaboration.startDate}</TableCell>
                            <TableCell>{collaboration.endDate ? collaboration.endDate : "Activo"}</TableCell>
                            <TableCell>{collaboration.numberHours}</TableCell>
                            <TableCell>{collaboration.observation}</TableCell>
                            <TableCell>
                                <Button variant="outlined" color="primary"
                                        onClick={() => handleEditCollaboration(collaboration.id)}>
                                    Editar
                                </Button>
                                <Button variant="outlined" color="secondary"
                                        onClick={() => handleOpenDeleteConfirmation(collaboration.id)}>
                                    Eliminar
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Dialog open={deleteConfirmationOpen} onClose={handleCloseDeleteConfirmation}>
                <DialogTitle>Confirmar Eliminación</DialogTitle>
                <DialogContent>
                    ¿Estás seguro de que deseas eliminar esta colaboración?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteConfirmation} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleDeleteCollaboration} color="secondary">
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={updateCollaborationModalOpen} onClose={handleCloseUpdateCollaborationModal}>
                <DialogTitle>Editar Colaboración</DialogTitle>
                <DialogContent>
                    {collaborationToUpdate && (
                        <div>
                            <TextField
                                margin="normal"
                                fullWidth
                                label="Fecha de Inicio"
                                InputLabelProps={{shrink: true}}
                                type="date"
                                value={collaborationToUpdate.startDate}
                                onChange={(e) => setCollaborationToUpdate({
                                    ...collaborationToUpdate,
                                    startDate: e.target.value
                                })}
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                label="Fecha de Fin"
                                InputLabelProps={{shrink: true}}
                                type="date"
                                value={collaborationToUpdate.endDate}
                                onChange={(e) => setCollaborationToUpdate({
                                    ...collaborationToUpdate,
                                    endDate: e.target.value
                                })}
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                label="Número de Horas"
                                type="number"
                                value={collaborationToUpdate.numberHours}
                                onChange={(e) => setCollaborationToUpdate({
                                    ...collaborationToUpdate,
                                    numberHours: e.target.value
                                })}
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                label="Observación"
                                multiline
                                rows={4}
                                value={collaborationToUpdate.observation}
                                onChange={(e) => setCollaborationToUpdate({
                                    ...collaborationToUpdate,
                                    observation: e.target.value
                                })}
                            />
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleUpdateCollaboration} color="primary">
                        Actualizar
                    </Button>
                    <Button onClick={handleCloseUpdateCollaborationModal} color="secondary">
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default VolunteerDetails;
