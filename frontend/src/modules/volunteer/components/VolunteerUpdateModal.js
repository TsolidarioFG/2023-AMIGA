import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField
} from '@mui/material';
import backend from "../../../backend";
import {Errors} from "../../common";

const VolunteerUpdateModal = ({ open, onClose, volunteer, setVolunteer }) => {
    const [updatedVolunteer, setUpdatedVolunteer] = useState({ ...volunteer });
    const [backendErrors, setBackendErrors] = useState(null);

    const handleFieldChange = (field, value) => {
        setUpdatedVolunteer((prevVolunteer) => ({
            ...prevVolunteer,
            [field]: value
        }));
    };

    const handleUpdate = () => {

        backend.volunteer.updateVolunteer(updatedVolunteer,
            () => {
                setVolunteer(updatedVolunteer);
                onClose();
            }, errors => setBackendErrors(errors));
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Actualizar Voluntario</DialogTitle>
            <DialogContent>
                <TextField
                    label="Nombre"
                    margin="normal"
                    fullWidth
                    value={updatedVolunteer.firstName}
                    onChange={(e) => handleFieldChange('firstName', e.target.value)}
                />
                <TextField
                    label="Apellidos"
                    margin="normal"
                    fullWidth
                    value={updatedVolunteer.lastName}
                    onChange={(e) => handleFieldChange('lastName', e.target.value)}
                />
                <TextField
                    label="Email"
                    margin="normal"
                    fullWidth
                    value={updatedVolunteer.email}
                    onChange={(e) => handleFieldChange('email', e.target.value)}
                />
                <TextField
                    label="Teléfono"
                    margin="normal"
                    fullWidth
                    value={updatedVolunteer.telephone}
                    onChange={(e) => handleFieldChange('telephone', e.target.value)}
                />
                <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleUpdate} color="primary">
                    Actualizar
                </Button>
                <Button onClick={onClose} color="secondary">
                    Cancelar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default VolunteerUpdateModal;
